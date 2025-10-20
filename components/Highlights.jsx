"use client";
export default function Highlights() {
  const highlights = [
    { label: "Pertemuan 💫" },
    { label: "Tunangan 💍" },
    { label: "Prewedding 📸" },
    { label: "Countdown ⏳" },
  ];

  return (
    <section className="flex gap-4 overflow-x-auto py-4 px-3 border-b border-gray-200">
      {highlights.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center bg-pink-50">
            <img
              src={`https://i.pravatar.cc/100?img=${i + 1}`}
              alt="Highlight"
              className="rounded-full object-cover w-14 h-14"
            />
          </div>
          <p className="text-xs mt-1 text-gray-700">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
