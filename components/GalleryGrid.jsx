"use client";
export default function GalleryGrid() {
  const dummyImages = Array.from({ length: 9 }).map(
    (_, i) => `https://picsum.photos/seed/${i + 1}/400`
  );

  return (
    <section className="grid grid-cols-3 gap-[2px] mt-1">
      {dummyImages.map((src, i) => (
        <div key={i} className="aspect-square overflow-hidden">
          <img
            src={src}
            alt={`foto-${i}`}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-200 ease-in-out"
          />
        </div>
      ))}
    </section>
  );
}
