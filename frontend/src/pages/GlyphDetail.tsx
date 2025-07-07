import {useState, type ChangeEvent, type FormEvent, useEffect} from 'react';
import axios, { type AxiosResponse } from 'axios';
import {api} from '../utils/axios';
// import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";
import {useParams} from "react-router";

type Glyph = {
    id: string;
    title: string;
    author: string;
    image: string;
    created_at: string;
}

function GlyphDetail() {
    const {uuid} = useParams();
    const [secret, setSecret] = useState<string>('');
    const [glyph, setGlyph] = useState<Glyph>();
    const [error, setError] = useState<string>('');
    const [pt, setPt ] = useState<string>('');

    const handleSecretChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSecret(event.target.value);
        setError('')
    }
    useEffect(() => {
        const getGlyph = async () =>{
            try{
                const res: AxiosResponse = await api.get<Glyph>(`/glyphs/${uuid}/`);
                setGlyph(res.data);
            }catch (err){
                setError((err as Error).message);
            }
        }
        getGlyph();
    }, [uuid]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const res: AxiosResponse = await api.post(`/glyphs/${uuid}/read/`, {
                key: secret,
            });

            setPt(res.data.plaintext);
            setError('')
            console.log(res.data);

        }catch (err) {
            setPt('')
            console.log(err)
            if (axios.isAxiosError(err) && err.response) {
                // Access the error response data
                setError(err.response.data.detail || JSON.stringify(err.response.data));
            } else {
                setError((err as Error).message);
            }
        }
    }


    return (
        <>
            <Navbar />
            <div  >
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 min-h-screen ">
                    <h1 className="text-3xl font-bold mb-2">{glyph && glyph.title}</h1>
                    {glyph && <img src={glyph.image} alt={glyph.title} className="max-w-sm rounded-lg" />}
                    <h5>{glyph && glyph.author}</h5>
                    <h6>{glyph && glyph.created_at}</h6>
                    <input
                        onChange={handleSecretChange}
                        type="text"
                        name="secret"
                        placeholder="Secret"
                        className="p-3 w-80 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-80 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
                    >
                        Decrypt
                    </button>
                    { pt && <div className="flex text-center justify-center mt-4 bg-gray-950">{pt}</div>}
                    {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>)}

                </form>
            </div>

        </>
    )
}

export default GlyphDetail;