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
  const typingTimeout = useRef(null);

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

    // setelah 1.5 detik tanpa input, set typing=false
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(async () => {
      await setDoc(userRef, { typing: false }, { merge: true });
    }, 1500);
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

    // ubah status typing ke false setelah kirim
    await setDoc(
      doc(db, "typingStatus", userName),
      { typing: false },
      { merge: true }
    );

    setInput("");
  };

  // 🧩 Tampilan
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="relative flex flex-col bg-white w-full max-w-md h-screen shadow-sm">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3">
            <button
              onClick={() =>
                router.push(`/profile?guest=${encodeURIComponent(userName)}`)
              }
              className="text-gray-600 hover:text-gray-800 text-xl"
            >
              ←
            </button>

            <div>
              {/* Nama user sebagai judul */}
              <h2 className="font-semibold text-pink-600 text-lg leading-tight">
                {userName}
              </h2>

              {/* Status mengetik */}
              {typingUsers.length > 0 ? (
                <p className="text-xs text-gray-500 italic animate-pulse mt-[1px]">
                  {typingUsers.length === 1
                    ? `${typingUsers[0].name} sedang mengetik...`
                    : typingUsers.length === 2
                    ? `${typingUsers[0].name} dan ${typingUsers[1].name} sedang mengetik...`
                    : "Beberapa orang sedang mengetik..."}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-[1px]">
                  Tidak ada yang mengetik
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
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
          <div ref={bottomRef} />
        </div>

        {/* Input (fixed bottom) */}
        <form
          onSubmit={handleSend}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t p-3 bg-white flex items-center gap-2 z-20"
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
    </div>
  );
}
