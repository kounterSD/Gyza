import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import logo from '../../public/gyza-logo.png'; // Assuming image is inside /src/assets

function Navbar() {
    const { isLoggedIn, user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 py-3 sticky top-0 z-50">
            {/* Left - Logo */}
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Gyza Logo" className="h-16 w-auto" />
                    <span className="text-3xl  text-red-600" style={{fontFamily: 'FetteEgyptien'}}>GYZA</span>
                </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 gap-7  text-base font-medium">
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link
                                    to="/explore"
                                    className="inline-block px-5 py-3 hover:bg-red-100 hover:text-red-600 rounded-md transition"
                                >
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/glyph/create"
                                    className="inline-block px-5 py-3 font-medium  hover:bg-red-100 hover:text-red-600 rounded-md transition"
                                >
                                    Create</Link>
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
                            <div className="w-10 rounded-full ring ring-gray-300 ring-offset-base-100 ring-offset-2">
                                <img
                                    src={user?.pfp || "https://img.daisyui.com/images/profile/demo/superperson@192.webp"}
                                    alt="user avatar"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
                        >
                            <li>
                <span className="px-2 py-1 text-sm text-gray-500">
                  Welcome, <strong>{user?.username}</strong>
                </span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-sm btn-ghost">
                            Sign In
                        </Link>
                        <Link to="/register" className="btn btn-sm btn-primary rounded-full">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
