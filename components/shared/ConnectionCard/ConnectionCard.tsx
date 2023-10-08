"use client";

import { getUserByID, getUserByTag } from "@/lib/db";
import { ListItem, Spinner } from "@/components/mui";
import Link from "next/link";
import { CONNECT } from "@/constants/routes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClientUser } from "@/types/models";
import { BASE_URL } from "@/constants/routes";

export default function ConnectionCard({ userID }: { userID: string }) {
  // export default async function ConnectionCard() {
  // const user = await getUserByTag({ tag: "@Briggs" });

  const [user, setUser] = useState<ClientUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/users/${userID}`);
        const userData = await res.json();
        console.log("USERCARD_USER: ", { userID, userData });
        if (!userData) return;
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error({ error });
        return null;
      }
    })();
  }, []);

  // await getUserByID({userID:"wyrqwyrywyf"})

  // const user = {
  //   username: "Bright Kingsley",
  //   photo:
  //     "https://lh3.googleusercontent.com/a/ACg8ocIvkwUqSe2THZsPlARbqVbdcf5ob0h9eFKUs4iK_6JUJzc=s96-c",
  //   tag: "@BrightwyjRe8",
  // };

  // if (!user) return null;
  return loading || !user ? (
    <div className="aspect-square !p-0 col-span-1 row-span-1 overflow-clip border-[1px]">
      <div className="w-full h-full">
        <div className="w-full h-full flex items-center justify-center relative after:absolute a">
          <Spinner color="deep-orange" className="h-10 w-10" />
          {/* <p>loading...</p> */}
          <div className="absolute bottom-0 p-1 z-10 w-full bg-white">
            <p className="font-extrabold animate-loader bg-gray-400 text-xs w-full" />
            <small className="text-xs w-full animate-loader bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ListItem className="aspect-square !p-0 col-span-1 row-span-1 overflow-clip border-[1px]">
      <Link href={`${CONNECT}/${user?.tag}`} className="w-full h-full">
        <div className="w-full h-full relative after:absolute a">
          <Image
            src={user?.photo}
            alt={user?.username}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 p-1 z-10 w-full bg-white">
            <p className="font-extrabold text-xs">{user?.username}</p>
            <small className="text-xs">{user?.tag}</small>
          </div>
        </div>
      </Link>
    </ListItem>
  );
}
