// "use client"

import { ListTile } from "@/app/components/client";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { CHATS, CONNECT } from "@/constants/routes";
import { Suspense } from "react";
import { ChatClass, UserClass } from "@/models";
import { BASE_URL } from "@/constants/routes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { getChats } from "@/lib/db";
import { ClientChat, ClientUser } from "@/types/models";

export default async function Chats() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return <h1>NO USER</h1>;

  const res = await getChats({
    userID: serverSession.user.id,
  });

  const chats = res as { chatData: ClientChat; memberUserData: ClientUser }[];

  console.log("GOTTEN_CHATS", chats);

  return (
    <>
      {chats && chats?.length > 0 ? (
        chats.map(
          (chat, i) =>
            chat.memberUserData && (
              <ListTile key={i} index={i}>
                <div className="flex items-center w-full gap-2 p-2 rounded-md bg-primary/10_">
                  <Link
                    href={`${CONNECT}/${chat.memberUserData.tag}`}
                    className="flex items-center justify-center w-12 h-12 text-gray-200 rounded-full overflow-clip shrink-0 bg-primary"
                  >
                    {chat.memberUserData.photo !== undefined &&
                    chat.memberUserData.photo ? (
                      <Image
                        src={chat.memberUserData.photo}
                        alt=""
                        width={100}
                        height={100}
                        priority
                      />
                    ) : (
                      <UserIcon className="w-8 h-8" />
                    )}
                  </Link>
                  <Link
                    href={`${CHATS}/${chat.chatData._id}`}
                    className="flex-1 text-left w-full overflow-hidden"
                  >
                    <p className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">
                      {chat.memberUserData.username}
                    </p>
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden w-full m-0 p-0">
                      last message, will do this soon
                    </p>
                  </Link>
                  <div className="flex-col shrink-0 items-center pr-3">
                    <small className="mx-auto text-gray-700">17:00</small>
                    <div className="flex items-center justify-center w-5 h-5 p-1 mx-auto text-xs font-bold text-white rounded-full shadow-md bg-primary shadow-primary/20">
                      <small>1</small>
                    </div>
                  </div>
                </div>
              </ListTile>
            )
        )
      ) : (
        <div className="flex items-center justify-center w-full h-full mt-40">
          <h1>You have no available chats</h1>
          <XMarkIcon className="w-6 h-6 fill fill-red-400" />
        </div>
      )}
    </>
  );
}
