"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  doc,
  setDoc,
} from "firebase/firestore";

export default function MessageRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bride = searchParams.get("bride");
  const groom = searchParams.get("groom");
  const guest = searchParams.get("guest");
  const bottomRef = useRef(null);

  // 🧍 Identitas user
  const randomId = Math.floor(Math.random() * 10000);
  let userRole = "guest";
  let userName = "Tamu " + randomId;

  if (bride) {
    userRole = "bride";
    userName = decodeURIComponent(bride);
  } else if (groom) {
    userRole = "groom";
    userName = decodeURIComponent(groom);
  } else if (guest) {
    userName = decodeURIComponent(guest);
  }

  // 💬 Pesan dan input
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✍️ Status mengetik
  const [typingUsers, setTypingUsers] = useState([]);
  let typingTimeout = useRef(null);

  // 🧠 Listener pesan realtime
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

  // 🔥 Listener status mengetik realtime
  useEffect(() => {
    const q = collection(db, "typingStatus");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const active = snapshot.docs
        .map((doc) => doc.data())
        .filter((d) => d.typing && d.name !== userName); // sembunyikan diri sendiri
      setTypingUsers(active);
    });
    return () => unsubscribe();
  }, [userName]);

  // 📜 Scroll ke bawah otomatis saat pesan baru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✍️ Fungsi update status mengetik
  const handleTyping = async (e) => {
    setInput(e.target.value);
    const userRef = doc(db, "typingStatus", userName);

    // tandai sedang mengetik
    await setDoc(
      userRef,
      {
        name: userName,
        role: userRole,
        typing: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    // setelah 3 detik tanpa input, set typing=false
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(async () => {
      await setDoc(userRef, { typing: false }, { merge: true });
    }, 3000);
  };

  // 🚀 Kirim pesan
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      sender: userName,
      role: userRole,
      text: input.trim(),
      createdAt: serverTimestamp(),
    });

    // setelah kirim pesan, ubah status typing ke false
    await setDoc(
      doc(db, "typingStatus", userName),
      { typing: false },
      { merge: true }
    );

    setInput("");
  };

  // 🧩 Tampilan
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

        {/* ✍️ indikator sedang mengetik */}
        {typingUsers.length > 0 && (
          <div className="px-4 pb-2 text-xs text-gray-500 italic animate-pulse">
            ✍️ {typingUsers.map((u) => u.name).join(", ")} sedang mengetik...
          </div>
        )}

        {/* Ref untuk scroll otomatis */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t p-3 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={handleTyping}
          placeholder="Tulis ucapanmu..."
          className="flex-1 border border-pink-400 rounded-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
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
