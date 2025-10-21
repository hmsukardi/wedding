"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function InvitationLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const guestName = decodeURIComponent(searchParams.get("guest") || "Tamu Undangan");

  const handleLogin = () => {
    // redirect ke profil / halaman utama setelah login
    router.push(`/profile?guest=${encodeURIComponent(guestName)}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-6">
      {/* Logo & Judul */}
      <div className="text-center mb-8">
        {/* Dummy logo */}
        <div className="mx-auto w-20 h-20 rounded-full border-2 border-pink-300 flex items-center justify-center text-pink-500 font-bold text-3xl">
          M&H
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-700">Undangan</h1>
        <p className="text-gray-500 text-sm">Jumat, 11 Juli 2025</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-xs text-center">
        <p className="text-gray-700 mb-2 text-sm">
          Kepada Yth. <br />
          <span className="font-medium">Bapak/Ibu/Saudara/i</span>
        </p>

        <input
          type="text"
          value={guestName}
          readOnly
          className="w-full border border-gray-300 rounded-md p-2 text-center mb-4 text-gray-800 bg-gray-50 cursor-not-allowed"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-md transition"
        >
          Login
        </button>

        <p className="text-gray-400 text-xs mt-4 italic">
          Mohon maaf apabila ada kesalahan dalam penulisan nama dan gelar
        </p>
      </div>
    </div>
  );
}
