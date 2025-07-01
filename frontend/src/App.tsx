import './css/App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Explore from './pages/Explore'
import Landing from './pages/Landing'
import GlyphDetail from './pages/GlyphDetail'
import {Route, Routes} from "react-router";

function App() {

  return (
    <main className="App">
        <Routes>
            <Route path="/landing" element={<Landing />} />,
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/glyph/:uuid" element={<GlyphDetail />}></Route>
        </Routes>
    </main>
  )
}

export default App
