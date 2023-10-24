"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Rat() {
  const { data } = useSession();
  const session = data;

  useEffect(() => {
    console.log("LOGOUT_RAT_SESSION", session);
    // if (session && !session?.user.id) signOut();
  }, [session]);
  return <></>;
}
