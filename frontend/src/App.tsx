import './css/App.css'
import {useUser} from "./contexts/UserContext.tsx";
import Register from './pages/Register'
import Login from './pages/Login'
import Explore from './pages/Explore'
import Landing from './pages/Landing'
import GlyphDetail from './pages/GlyphDetail'
import GlyphCreate from "./pages/GlyphCreate.tsx";
import {ProtectedRoute} from "./utils/ProtectedRoute.tsx";
import {Navigate, Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

function App() {
    const { logout, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthExpired = () => {
            logout();
            navigate('/login');
        };

        window.addEventListener('auth:expired', handleAuthExpired);

        return () => {
            window.removeEventListener('auth:expired', handleAuthExpired);
        };
    }, [logout, navigate]);
  return (
    <main className="App">
        <Routes>
            <Route path="/" element={<Navigate to="/landing" replace/>}/>
            <Route path="/landing" element={<Landing/>}/>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/explore" element={<Explore/>}></Route>
            <Route path="/glyph/create/" element={<ProtectedRoute user={user}><GlyphCreate/></ProtectedRoute>}/>
            <Route path="/glyph/:uuid" element={<GlyphDetail/>}></Route>
        </Routes>

    </main>
  )
}

export default App
