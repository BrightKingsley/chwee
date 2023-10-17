"use client";

import { useContext, useEffect, useState } from "react";
import nft from "../../assets/images/nft.jpg";
import { motion } from "framer-motion";
import Close from "../Close";
import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function Header({
  imgShown,
  title,
  location,
  leading,
  trailing,
}: HeaderType) {
  //context
  // const { user } = useContext(AuthContext);

  //hooks
  // const navigate = useNavigate();
  // const location = useLocation();
  const { data } = useSession();
  const session: Session | any = data;

  useEffect(() => {
    console.log("SESSION==>", session);
  }, [session]);

  //functions
  const navigateToAccount = () => {
    // navigate(ACCOUNT, { state: { source: location } });
  };

  return (
    <header className="relative pl-14 md:pl-0 z-10 flex items-center w-full px-3 py-1 bg-white border-b h-14">
      {leading && (
        <div className="mr-2 shrink-0">{leading.map((item) => item)}</div>
      )}
      <h1 className="flex-1 font-bold capitalize font-druk-wide-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h1>
      {/* {imgShown && (
        <button
          onClick={() => navigateToAccount()}
          className="flex items-center justify-center w-10 h-10 ml-auto text-white rounded-full bg-primary overflow-clip shrink-0 hover:rounded-full"
        >
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="profile"
              fill
              priority
              draggable={false}
            />
          ) : (
            <UserIcon />
          )}
        </button>
      )} */}
      {trailing && (
        <div className="ml-auto flex gap-2 items-center">
          {trailing.map((item) => item)}
        </div>
      )}
    </header>
  );
}
