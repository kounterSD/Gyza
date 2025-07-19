import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
})

api.interceptors.request.use(
    (config)  => {
        const access_token = localStorage.getItem("access")
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`
        }
        return config;
    },
    (err) => {
        console.error(err)
        return Promise.reject(err)
    }
)

const refreshToken = async () => {
    try {
        const resp = await axios.post(`${apiBaseUrl}/users/token/refresh/`, {},{withCredentials:true});
        console.log("refresh token", resp.data);
        return resp.data;
    } catch (e) {
        // If refresh token fails with 401, it means the refresh token has expired
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            // Clear all tokens and user data
            localStorage.removeItem("access");
            // handled below to trigger logout
            throw new Error("refresh_token_expired");
        }
        throw e;
    }
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        console.log("Response interceptor triggered:", {
            status: error.response?.status,
            url: originalRequest.url,
            retry: originalRequest._retry
        });

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("Starting token refresh process");
            originalRequest._retry = true;

            try {
                const resp = await refreshToken();
                console.log("Token refresh completed");

                const access_token = resp.access;
                localStorage.setItem("access", access_token);
                console.log("Retrying original request:", originalRequest.url);
                return api(originalRequest);
            } catch (refreshError:Error | any) {
                if (refreshError.message === "refresh_token_expired") {
                    // triggers CustomEvent to trigger logout.
                    window.dispatchEvent(new CustomEvent('auth:expired'));
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);