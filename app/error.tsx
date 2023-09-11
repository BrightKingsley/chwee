"use client";

import React, { useEffect } from "react";

export default function LandingError({ error, reset }: LandingErrorProps) {
  useEffect(() => {
    console.error("LANDINGPAGE_ERROR", error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()} className="bg-red">
        Retry
      </button>
    </div>
  );
}
