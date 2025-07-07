import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {useNavigate} from "react-router-dom";


function Navbar() {
    const { isLoggedIn, user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');

    }
    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            {/* Left - Logo */}
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl text-red-600 font-bold">
                    GYZA
                </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/explore" className="font-medium">
                                    Explore
                                </Link>

                            </li>
                            <li>
                                <Link to="/glyph/create" className="font-medium">
                                    Glyph Create
                                </Link>

                            </li>
                        </>

                    )}
                </ul>
            </div>

            {/* Right - Auth/User */}
            <div className="navbar-end">
                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                                    alt="user avatar"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                <span className="text-sm text-gray-600 px-2">
                  Welcome, {user?.username}
                </span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-red-600">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost">
                            Sign In
                        </Link>
                        <Link to="/register" className="btn btn-primary">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
