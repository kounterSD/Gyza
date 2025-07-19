import { useState, type ChangeEvent, type FormEvent } from 'react';
import Navbar from '../components/Navbar';
import { api } from '../utils/axios';
import Footer from "../components/Footer.tsx";

export default function GlyphCreate() {
    const [title, setTitle] = useState('');
    const [keyVal, setKeyVal] = useState('');
    const [plaintext, setPlaintext] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('key', keyVal);
            formData.append('plaintext', plaintext);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            await api.post('/glyphs/create/', formData);
            setSuccess('Glyph created successfully!');
            setTitle('');
            setKeyVal('');
            setPlaintext('');
            setImageFile(null);
            setImagePreview(null);
        } catch (err) {
            console.error(err);
            setError('Failed to create glyph');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center gap-4 min-h-screen px-4  text-white">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-2">Create Glyph</h1>

                    {/* Title */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="p-3 w-full border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        required
                    />

                    {/* Image Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full max-h-64 rounded-lg border border-gray-400"
                        />
                    )}

                    {/* Key */}
                    <input
                        type="text"
                        value={keyVal}
                        onChange={(e) => setKeyVal(e.target.value)}
                        placeholder="Key"
                        className="p-3 w-full border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        required
                    />

                    {/* Plaintext */}
                    <textarea
                        value={plaintext}
                        onChange={(e) => setPlaintext(e.target.value)}
                        placeholder="Plaintext"
                        rows={4}
                        className="p-3 w-full border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        required
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
                    >
                        Create
                    </button>

                    {/* Feedback */}
                    {success && <div className="text-green-500 text-center">{success}</div>}
                    {error && <div className="text-red-500 text-center">{error}</div>}
                </form>
            </div>
            <Footer/>
        </>
    );
}
