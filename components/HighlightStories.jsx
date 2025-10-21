"use client";

import { useState, useEffect } from "react";

export default function HighlightStories({ isOpen, onClose, stories, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Reset saat modal dibuka
    setCurrentIndex(0);
    setProgress(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (currentIndex >= stories.length) {
      onClose();
      return;
    }

    // Timer progress bar
    const duration = 4000; // 4 detik per story
    const interval = 50;
    const step = (interval / duration) * 100;

    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
            clearInterval(timer);
            setCurrentIndex((prevIndex) =>
              prevIndex + 1 < stories.length ? prevIndex + 1 : prevIndex
            );
            return 0;
          }
          
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isOpen]);

  if (!isOpen) return null;

  const story = stories[currentIndex] || null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-3">
        {stories.map((_, i) => (
          <div
            key={i}
            className="h-[3px] bg-gray-600 flex-1 rounded overflow-hidden"
          >
            <div
              className={`h-full ${
                i < currentIndex
                  ? "bg-pink-400"
                  : i === currentIndex
                  ? "bg-pink-400"
                  : "bg-gray-600"
              }`}
              style={{
                width:
                  i === currentIndex ? `${Math.min(progress, 100)}%` : i < currentIndex ? "100%" : "0%",
                transition: "width 0.05s linear",
              }}
            ></div>
          </div>
        ))}
      </div>

    
      {/* Konten story */}
        {story && (
        <div className="relative w-full max-w-md">
            <img
            src={story.image}
            alt={story.caption}
            className="w-full h-[80vh] object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <p className="font-semibold">{title}</p>
            <p className="text-sm">{story.caption}</p>
            </div>
        </div>
        )}


      {/* Tombol close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>

      {/* Navigasi manual */}
      <div
        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
      ></div>
      <div
        onClick={() => setCurrentIndex((prev) => prev + 1)}
        className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
      ></div>
    </div>
  );
}
