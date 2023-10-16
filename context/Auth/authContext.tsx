"use client";
import { Rat } from "@/app/components/client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};

export default function Provider({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      <>
        <Rat />
        {children}
      </>
    </SessionProvider>
  );
}
