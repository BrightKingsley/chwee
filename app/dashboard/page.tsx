"use client"

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function DashboardPage() {
  const { data } = useSession();
  const session: Session | any = data;
  if (session) {
    return (
      <>
        {/* Signed in as {session ?? session?.user?.email} <br /> */}
        <h1>Hello,{session.user.name}</h1>
      </>
    );
  } else return <h1>Hello, . . .</h1>;
}


