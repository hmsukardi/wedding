"use client";
import ProfileHeader from "@/components/ProfileHeader";
import Highlights from "@/components/Highlights";
import GalleryGrid from "@/components/GalleryGrid";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-white text-gray-800 font-sans">
      <div className="max-w-md w-full">
        {/* Profile Section */}
        <ProfileHeader />

        {/* Highlights */}
        <Highlights />

        {/* Gallery */}
        <GalleryGrid />
      </div>
    </main>
  );
}
