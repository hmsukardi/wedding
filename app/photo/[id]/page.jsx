"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PhotoDetail() {
  const router = useRouter();
  const { id } = useParams();

  const photos = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/600/600?random=${i + 1}`,
    caption: "Momen indah bersama 💕",
    likes: Math.floor(Math.random() * 100) + 50,
    comments: Math.floor(Math.random() * 10),
    location: "The Forest Villa, Bandung",
  }));

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // Selalu mulai dari foto pertama (index 0)
    setStartIndex(0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/70 backdrop-blur-md border-b border-gray-800">
        <button
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white text-lg"
        >
          ←
        </button>
        <p className="font-semibold text-white text-sm">Post</p>
        <div className="w-6"></div>
      </div>

      {/* Scrollable feed */}
      <div className="flex-1 overflow-y-auto">
      {photos.slice(startIndex).map((photo) => (
        <div key={photo.id} className="border-b border-gray-200 bg-white">
            {/* Header akun + lokasi */}
            <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <img
                src="https://i.postimg.cc/KYsZq3HJ/photo-profile-r-h.jpg"
                alt="Riris & Hamid"
                className="w-10 h-10 rounded-full object-cover border border-gray-200" // kecilin disini
                />
                <div>
                <h2 className="font-semibold text-gray-800 text-sm">Riris & Hamid</h2>
                <p className="text-xs text-gray-500">{photo.location}</p>
                </div>
            </div>
            <button className="text-gray-400">⋮</button>
            </div>

            {/* Foto */}
            <div className="w-full bg-black flex justify-center">
            <img
                src={photo.image}
                alt={`Foto ${photo.id}`}
                className="max-h-[80vh] object-contain"
            />
            </div>

            {/* Info bawah */}
            <div className="px-4 py-3 bg-white text-gray-700">
            <div className="flex items-center gap-4 text-sm mb-2">
                <p>❤️ {photo.likes}</p>
                <p>💬 {photo.comments}</p>
            </div>

            <p className="text-sm text-gray-800 mb-2">
                <span className="font-semibold text-gray-900">Riris dan Hamid</span>{" "}
                {photo.caption}
            </p>

            {/* Dua komentar terakhir */}
            <div className="space-y-1 text-sm">
                <p>
                <span className="font-semibold text-gray-900">Rina:</span>{" "}
                Wahh cantik banget tempatnya 💐
                </p>
                <p>
                <span className="font-semibold text-gray-900">Doni:</span>{" "}
                Semoga lancar sampai hari H 💖
                </p>
            </div>

            {/* Waktu posting (opsional) */}
            <p className="text-xs text-gray-400 mt-2">21 Oktober 2025</p>
            </div>
        </div>
        ))}

      </div>
    </div>
  );
}
