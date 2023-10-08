"use client";

import Image from "next/image";
import React, { useEffect } from "react";

export default function LandingError({ error, reset }: LandingErrorProps) {
  useEffect(() => {
    console.error("LANDINGPAGE_ERROR", error);
  }, [error]);
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/images/404-error-page.jpg"
        alt="404"
        fill
        className="object-cover w-full h-full"
      />
      <div className="absolute">
        <h2>Something went wrong {error.message}</h2>
        <button onClick={() => reset()} className="bg-red">
          Retry
        </button>
      </div>
    </div>
  );
}
