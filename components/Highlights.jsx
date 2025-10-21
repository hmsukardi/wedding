"use client";

import { useState } from "react";
import HighlightStories from "./HighlightStories";

export default function Highlights() {
  const highlights = [
    {
      label: "Pertemuan 💫",
      stories: [
        { image: "https://picsum.photos/400/700?random=1", caption: "Awal pertemuan" },
        { image: "https://picsum.photos/400/700?random=2", caption: "Ngopi bareng ☕" },
        { image: "https://picsum.photos/400/700?random=3", caption: "First trip 🚗" },
      ],
    },
    {
      label: "Tunangan 💍",
      stories: [
        { image: "https://picsum.photos/400/700?random=4", caption: "Cincin disematkan 💕" },
        { image: "https://picsum.photos/400/700?random=5", caption: "Doa bersama keluarga" },
      ],
    },
    {
      label: "Prewedding 📸",
      stories: [
        { image: "https://picsum.photos/400/700?random=6", caption: "Prewed di taman 🌸" },
        { image: "https://picsum.photos/400/700?random=7", caption: "Foto malam hari ✨" },
      ],
    },
  ];

  const [activeHighlight, setActiveHighlight] = useState(null);

  return (
    <>
      <section className="px-4 py-3 flex gap-3 justify-center bg-white overflow-x-auto scrollbar-hide">
        {highlights.map((highlight, i) => (
          <div
            key={i}
            className="text-center cursor-pointer"
            onClick={() => setActiveHighlight(highlight)}
          >
            <div className="p-[2px] bg-gradient-to-tr from-pink-400 to-blue-300 rounded-full inline-block">
              <div className="p-[2px] bg-white rounded-full">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt={highlight.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1 whitespace-nowrap">
              {highlight.label}
            </p>
          </div>
        ))}
      </section>

      {activeHighlight && (
        <HighlightStories
          isOpen={!!activeHighlight}
          onClose={() => setActiveHighlight(null)}
          stories={activeHighlight.stories}
          title={activeHighlight.label}
        />
      )}
    </>
  );
}
