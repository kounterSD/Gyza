import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="w-full bg-gray-950 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
        <Link to="/landing" className="text-xl font-bold text-red-600">GYZA</Link>
        <div className="space-x-4">
    <Link to="/explore" className="hover:underline">Explore</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        </div>
        </div>
        </nav>
);
}

export default Navbar;
