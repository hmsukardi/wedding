"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MessagePage() {
  const router = useRouter();

  const [messages, setMessages] = useState([
    { sender: "Dinda", text: "Selamat yaaa 💖" },
    { sender: "Budi", text: "Gak sabar nunggu harinya 🥰" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = {
      sender: "Tamu",
      text: input,
    };
    setMessages([...messages, newMessage]);
    setInput("");
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
          <h2 className="font-semibold text-pink-600 text-lg">
            💌 Ucapan untuk Rama & Sinta
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "Tamu" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                msg.sender === "Tamu"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="font-semibold text-xs mb-1 opacity-80">{msg.sender}</p>
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
          placeholder="Ketik ucapanmu..."
          className="flex-1 border rounded-md p-2 text-sm"
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
