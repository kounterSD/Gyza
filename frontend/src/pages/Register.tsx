import { useState, type ChangeEvent, type FormEvent } from 'react';
import axios, {type AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

// Define a type for what the API returns
type TokenResponse = {
    access: string;
    refresh: string;
};

function Register() {
    // useState with types
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    // Form submission handler with typed event
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // setting Token response type and --> post form data
            const res: AxiosResponse<TokenResponse> = await axios.post(
                'http://localhost:8000/api/users/register/',
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                }
            );

            console.log(res.data);

            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);

            navigate('/explore');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    // Input change handlers with types
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };



    return (
        <>
            <div>
                <Navbar/>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">Create an account</h2>

                <form className="space-y-5 text-left" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm mb-1 text-gray-300 ">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="yourusername"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm mb-1 text-gray-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm mb-1 text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm mb-1 text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
                    >
                        Register
                    </button>
                </form>

                {formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-sm">Passwords do not match</p>
                )}

                <p className="mt-6 text-sm text-gray-400 text-center">
                    Already have an account? <a href="/login" className="text-red-400 hover:underline">Sign in</a>
                </p>
            </div>
            </div>
            <Footer/>
        </>
);
}

export default Register;
