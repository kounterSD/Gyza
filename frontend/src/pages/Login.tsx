import { useState, type ChangeEvent, type FormEvent } from 'react';
import axios, {type AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";
import { useUser } from '../contexts/UserContext';

// Define a type for what the API returns
type TokenResponse = {
    id: string;
    username: string;
    email: string;
    access: string;
};

export default function Login() {
    // useState with types
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const { login } = useUser();


    // Form submission handler with typed event
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password } = formData;

        try {
            // post form data
            const res: AxiosResponse<TokenResponse> = await axios.post(
                'http://localhost:8000/api/users/token/',
                {
                    username: username,
                    password: password
                },{withCredentials: true},
            );

            const user = {
                id: res.data.id,
                username:res.data.username,
                email:res.data.email,
            }
            // from useUser custom hook to share userinfo with UserContext
            login(user);
            localStorage.setItem('access', res.data.access);

            navigate('/explore');
        } catch (err) {
            console.error('Login failed:', err);
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
                <h2 className="text-3xl font-bold mb-6 text-center">Sign in</h2>

                <form className="space-y-5 text-left" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm mb-1 text-gray-300">
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

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

