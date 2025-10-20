"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RSVPModal from "./RSVPModal";

export default function ProfileHeader() {
  const [showRSVP, setShowRSVP] = useState(false);
  const router = useRouter();

  return (
    <section className="p-4 border-b border-gray-200 bg-white relative">
      {/* Modal */}
      <RSVPModal isOpen={showRSVP} onClose={() => setShowRSVP(false)} />

      {/* Bagian atas */}
      <div className="flex items-center">
        <div className="flex-shrink-0 pl-3">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="Foto Pasangan"
            className="rounded-full w-24 h-24 border-4 border-pink-400 object-cover"
          />
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

      {/* Nama & bio */}
      <div className="mt-3 pl-3 text-sm">
        <p className="font-semibold text-pink-600 text-[15px]">Rama & Sinta</p>
        <p className="text-gray-700 leading-tight">
          💍 20 Desember 2025 <br />
          📍 The Forest Villa, Bandung
        </p>
      </div>

      {/* Tombol */}
      <div className="flex gap-2 mt-3 px-3">
        <button
          onClick={() => setShowRSVP(true)}
          className="flex-1 bg-pink-500 text-white font-medium py-1.5 rounded-md hover:bg-pink-600 transition"
        >
          Follow
        </button>
        <button
          onClick={() => router.push("/message")}
          className="flex-1 border border-gray-300 py-1.5 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Message
        </button>
      </div>
    </section>
  );
}
