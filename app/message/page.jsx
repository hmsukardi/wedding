"use client";

import { Suspense } from "react";
import MessageRoomContent from "./MessageRoomContent";

export default function MessageRoom() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-500">Loading...</p>}>
      <MessageRoomContent />
    </Suspense>
  );
}
