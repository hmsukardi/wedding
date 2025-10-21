"use client";

import { Suspense } from "react";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-500">Loading...</p>}>
      <ProfileContent />
    </Suspense>
  );
}
