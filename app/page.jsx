"use client";

import { Suspense } from "react";
import InvitationLogin from "./InvitationLogin";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-500">Loading...</p>}>
      <InvitationLogin />
    </Suspense>
  );
}
