"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleryGrid() {
  const router = useRouter();

  return (
    <section className="grid grid-cols-3 gap-[1px] mt-2">
      {Array.from({ length: 9 }).map((_, i) => {
        const [loaded, setLoaded] = useState(false);

        return (
          <div
            key={i}
            className="relative w-full h-32 overflow-hidden cursor-pointer"
            onClick={() => router.push(`/photo/${i + 1}`)}
          >
            <img
              src={`https://picsum.photos/300/300?random=${i + 1}`}
              alt={`Foto ${i}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-[1.05]
                ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
            />
          </div>
        );
      })}
    </section>
  );
}
