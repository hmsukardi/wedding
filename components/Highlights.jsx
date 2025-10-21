"use client";

export default function Highlights() {
  const highlights = [
    { label: "Pertemuan 💫" },
    { label: "Tunangan 💍" },
    { label: "Prewedding 📸" },
    { label: "Countdown ⏳" },
    { label: "Map 🗺️" },
    { label: "RSVP 💌" },
  ];

  return (
    <section className="px-4 py-3 flex gap-3 bg-white overflow-x-auto scrollbar-hide">
      <div className="flex gap-3">
        {highlights.map((item, i) => (
          <div key={i} className="text-center flex-shrink-0">
            {/* Lapisan gradasi */}
            <div className="p-[2px] bg-gradient-to-tr from-pink-400 to-blue-300 rounded-full inline-block">
              {/* Lapisan putih */}
              <div className="p-[2px] bg-white rounded-full">
                {/* Gambar di dalam lingkaran */}
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Label */}
            <p className="text-xs text-gray-600 mt-1 whitespace-nowrap">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
