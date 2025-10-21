"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import RSVPModal from "@/components/RSVPModal";
import Highlights from "@/components/Highlights"; // ✅ Tambahkan ini

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guestName = decodeURIComponent(searchParams.get("guest") || "Tamu Undangan");

  const [showRSVP, setShowRSVP] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Foto profil & stats */}
      <section className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="flex-shrink-0 pl-3">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-400 to-blue-300">
              <div className="p-[3px] rounded-full bg-white">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Foto Pasangan"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-around flex-1 text-center ml-4">
            <div>
              <p className="text-lg font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">345</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">180</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>

        {/* Nama & Bio */}
        <div className="mt-3 pl-3 text-sm">
          <p className="font-semibold text-pink-600 text-[15px]">Rama & Sinta</p>
          <p className="text-gray-700 leading-tight">
            💍 20 Desember 2025 <br />
            📍 The Forest Villa, Bandung
          </p>
        </div>

        {/* Tombol Follow & Message */}
        <div className="flex gap-2 mt-3 px-3">
          <button
            onClick={() => setShowRSVP(true)}
            className="flex-1 bg-pink-500 text-white font-medium py-1.5 rounded-md hover:bg-pink-600 transition"
          >
            Follow
          </button>
          <button
            onClick={() => router.push(`/message?guest=${encodeURIComponent(guestName)}`)}
            className="flex-1 border border-gray-300 py-1.5 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Message
          </button>
        </div>
      </section>

      {/* ✅ Komponen Highlight baru */}
      <Highlights />

      {/* Grid Foto */}
      <section className="grid grid-cols-3 gap-1 mt-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <img
            key={i}
            src={`https://picsum.photos/300/300?random=${i + 1}`}
            alt={`Foto ${i}`}
            className="w-full h-32 object-cover"
          />
        ))}
      </section>

      {/* RSVP Modal */}
      <RSVPModal isOpen={showRSVP} onClose={() => setShowRSVP(false)} />
    </div>
  );
}
