"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function MessageRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ambil parameter dari URL
  const bride = searchParams.get("bride");
  const groom = searchParams.get("groom");
  const guest = searchParams.get("guest");

  // tentukan siapa user sekarang
  let userRole = "guest";
  let userName = "Tamu";
  if (bride) {
    userRole = "bride";
    userName = decodeURIComponent(bride);
  } else if (groom) {
    userRole = "groom";
    userName = decodeURIComponent(groom);
  } else if (guest) {
    userName = decodeURIComponent(guest);
  }

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ambil data realtime dari Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });
    return () => unsubscribe();
  }, []);

  // kirim pesan baru
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        sender: userName,
        role: userRole,
        text: input.trim(),
        createdAt: serverTimestamp(),
      });
      setInput("");
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            ←
          </button>
          <div>
            <h2 className="font-semibold text-pink-600 text-lg leading-tight">
              💌 Ucapan untuk Rama & Sinta
            </h2>
            <p className="text-xs text-gray-500">
              Kamu login sebagai{" "}
              <span className="font-medium text-gray-700">{userName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            Belum ada ucapan, jadilah yang pertama 💕
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === userName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[75%] transition ${
                msg.sender === userName
                  ? msg.role === "bride" || msg.role === "groom"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-pink-500 text-white rounded-br-none"
                  : msg.role === "bride" || msg.role === "groom"
                  ? "bg-blue-100 text-blue-800 rounded-bl-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="font-semibold text-xs mb-1 opacity-80">
                {msg.sender}
              </p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t p-3 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis ucapanmu..."
          className="flex-1 border rounded-md p-2 text-sm focus:outline-pink-500"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 transition"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
