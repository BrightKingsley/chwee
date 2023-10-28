"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Header } from "@/app/components/client";
import { Button } from "@/app/components/mui";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import EmotionSadLineIcon from "remixicon-react/EmotionSadLineIcon";

export default function LandingError({ error, reset }: LandingErrorProps) {
  useEffect(() => {
    console.error("LANDINGPAGE_ERROR", error);
  }, [error]);
  return (
    <div className="w-screen bg-gray-400 error-pattern_ h-screen flex justify-center flex-col">
      <div className="w-fit h-fit m-auto space-y-2">
        <div className="flex items-center">
          <p className="font-bold text-xl">Something went wrong...</p>
          <EmotionSadLineIcon className="w-6 h-6 text-orange-700" />{" "}
        </div>
        <Button
          // variant="outlined"
          fullWidth
          onClick={() => reset()}
          className="flex error-pattern bg-primary items-center gap-2 px-2 py-2 mx-auto justify-center"
        >
          <p>Retry</p>
          <RefreshLineIcon className="w-6 h-6" />
        </Button>
        {/* {process.env.NODE_ENV === "development" ? (
          <div>
            <span className="text-red-400">ERROR:</span>
            <div className="space-y-3">
              <h2 className="font-bold text-3xl">{error.name}</h2>
              <div className="border p-2">
                <h3 className="font-bold">Cause:</h3>
                <p>{error.message}</p>
              </div>
             
            </div>
          </div>
        ) : null} */}
        <div>
          <span className="text-red-400">ERROR:</span>
          <div className="space-y-3">
            <h2 className="font-bold text-3xl">{error.name}</h2>
            <div className="border p-2">
              <h3 className="font-bold">Cause:</h3>
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
