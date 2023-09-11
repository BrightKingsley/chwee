"use client";

import { useContext, useEffect, useState } from "react";
import nft from "../../assets/images/nft.jpg";
import { motion } from "framer-motion";
import { HeaderType } from "./types";
import Close from "../Close";
import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function Header({ imgShown, title }: HeaderType) {
  //context
  // const { user } = useContext(AuthContext);

  //hooks
  // const navigate = useNavigate();
  // const location = useLocation();
  const { data } = useSession();
  const session: Session | any = data;

  useEffect(() => {
    console.log("SESSION==>",session);
  }, []);

  //functions
  const navigateToAccount = () => {
    // navigate(ACCOUNT, { state: { source: location } });
  };

  return (
    <header className="relative z-10 flex items-center w-full px-3 py-1 bg-white border-b h-14">
      <div className="ml-4 font-bold capitalize">
        <h1>{title}</h1>
      </div>
      {imgShown && (
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
      )}
    </header>
  );
}
