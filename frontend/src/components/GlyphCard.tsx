import type { Glyph } from './../pages/Explore.tsx';
import * as React from "react";

interface GlyphCardProps {
    glyph: Glyph
}

export const GlyphCard: React.FC<GlyphCardProps> = ({glyph}) => {
    return (
        <div
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
        >
            <img
                src={glyph.image}
                alt={glyph.title}/>

            <h2 className="text-xl font-semibold">{glyph.title}</h2>
        </div>
    )
}