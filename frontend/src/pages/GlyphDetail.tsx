import {useState, type ChangeEvent, type FormEvent, useEffect} from 'react';
import axios, {type AxiosResponse } from 'axios';
// import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";
import {useParams} from "react-router";

type Glyph = {
    id: string;
    title: string;
    image: string;
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
        const fetchGlyph = async () =>{
            try{
                const res: AxiosResponse = await axios.get<Glyph>(`http://localhost:8000/api/glyphs/${uuid}/`);
                setGlyph(res.data);
            }catch (err){
                setError((err as Error).message);
            }
        }
        fetchGlyph();
    }, [uuid]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const res: AxiosResponse = await axios.post(`http://localhost:8000/api/glyphs/${uuid}/read/`, {
                key: secret,
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },});

            setPt(res.data.plaintext);
            setError('')

        }catch (err) {
            setPt('')
            if (axios.isAxiosError(err) && err.response) {
                // Now you can access err.response.data
                console.error(err.response.data);
                setError(err.response.data?.detail || JSON.stringify(err.response.data));
            } else {
                setError((err as Error).message);
            }
        }
    }


    return (
        <>
            <Navbar/>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-950">
                {glyph && <img src={glyph.image} alt={glyph.title} className="max-w-sm rounded-lg" />}
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
            </form>

            { pt && <div className="flex text-center justify-center mt-4 bg-gray-950">{pt}</div>}
            {error && (
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>)}
        </>
    )
}

export default GlyphDetail;