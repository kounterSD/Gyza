import {type AxiosResponse } from 'axios';
import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.tsx";
import {Link} from 'react-router-dom';
import {api} from '../utils/axios';


type Glyph = {
    id: string;
    title: string;
    image: string;
}

export default function Explore() {
    const [glyphs, setGlyphs] = useState<Glyph[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchGlyphs = async () => {
            try {
                const res: AxiosResponse<Glyph[]> = await api.get<Glyph[]>('/glyphs/explore/')
                setGlyphs(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load users');
            }
        };
        fetchGlyphs();
    }, []);

    return (
        <>
            <div>
                <Navbar/>
            </div>

            <div className="min-h-screen bg-gray-900 text-white p-6">
                <h1 className="text-3xl font-bold mb-6">Explore Glyphs</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {glyphs.map((Glyph) => (
                        <Link to={`/glyph/${Glyph.id}`} key={Glyph.id}>
                            <div
                                className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
                            >
                                <img
                                    src={Glyph.image}
                                    alt={Glyph.title}/>

                                <h2 className="text-xl font-semibold">{Glyph.title}</h2>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </>

    )
}
