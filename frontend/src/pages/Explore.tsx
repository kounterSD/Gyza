import {type AxiosResponse } from 'axios';
import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.tsx";
import {Link} from 'react-router-dom';
import {api} from '../utils/axios';
import {GlyphCard} from "../components/GlyphCard.tsx";
import Footer from "../components/Footer.tsx";

export type Glyph = {
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
            <Navbar />

            <div className="min-h-screen bg-base-200 text-base-content p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="flex justify-center text-4xl font-bold mb-8">Explore Glyphs</h1>

                    {error && (
                        <div className="alert alert-error shadow-lg mb-6">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {glyphs.map((glyph) => (
                            <Link to={`/glyph/${glyph.id}`} key={glyph.id}>
                                <GlyphCard glyph={glyph} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}
