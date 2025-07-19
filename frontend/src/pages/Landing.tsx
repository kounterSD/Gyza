import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import logo from "../../public/gyza-logo.png";
import Footer from "../components/Footer.tsx"; // adjust path

export default function Landing() {
    return (
        <>
            <Navbar />
            <main className="h-screen bg-base-200 text-base-content px-6 py-2 flex items-start justify-center">
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-30">

                    <div className="flex flex-col items-start gap-6 text-white max-w-md">
                        <img src={logo} alt="GYZA Logo" className="h-100 w-auto" />
                        <h1
                            className="text-5xl font-extrabold text-red-600 leading-tight"
                            style={{ fontFamily: "FetteEgyptien" }}
                        >
                            GYZA
                        </h1>
                        <p className="text-lg text-gray-300">
                            A creative tool to build, explore, and share modern glyphs like never before.
                        </p>
                    </div>

                    <div className="grid gap-6 text-white text-left max-w-md">
                        <div>
                            <h2 className="text-xl font-bold text-red-500">1. Create</h2>
                            <p className="text-gray-300">Design unique glyphs. Hide plaintext in images.</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-500">2. Explore</h2>
                            <p className="text-gray-300">Browse glyphs made by the community.</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-500">3. Read</h2>
                            <p className="text-gray-300">Decrypt Glyphs if you have the secret.</p>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Link
                                to="/explore"
                                className="px-6 py-3 rounded-full bg-white text-red-600 font-bold hover:bg-red-100 transition"
                            >
                                Explore
                            </Link>
                            <Link
                                to="/glyph/create"
                                className="px-6 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition"
                            >
                                Create Now
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
            <Footer/>
        </>
    );
}
