// "use client"

import { ListTile } from "@/components/shared";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { CHATS } from "@/constants/routes";
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
                <Link
                  href={`${CHATS}/${chat.chatData._id}`}
                  className="flex items-center w-full gap-2 p-2 rounded-md bg-primary/10_"
                >
                  <div className="flex items-center justify-center w-12 h-12 text-gray-200 rounded-full overflow-clip shrink-0 bg-deep-orange-400">
                    {chat.memberUserData.photo !== undefined &&
                    chat.memberUserData.photo ? (
                      <Image
                        src={chat.memberUserData.photo}
                        alt=""
                        fill
                        sizes=""
                        priority
                      />
                    ) : (
                      <UserIcon className="w-8 h-8" />
                    )}
                  </div>
                  <div className="w-full text-left ">
                    <p className="font-semibold">
                      {chat.memberUserData.username}
                    </p>
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                      last message, will do this soon
                    </p>
                  </div>
                  <div
                    key={Math.random()}
                    className="pr-3 flex-col items-center"
                  >
                    <small className="mx-auto text-gray-700">17:00</small>
                    <span className="rounded-full p-2 font-bold bg-primary shadow-md text-white w-5 h-5 shadow-primary/20 flex items-center  mx-auto justify-center">
                      1
                    </span>
                  </div>
                </Link>
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

/*
 {
    chatData: {
      _id: '650f75061fd5a15a2b6a7961',
      password: '',
      members: [Array],
      createdAt: '2023-09-23T23:30:14.989Z',
      updatedAt: '2023-09-23T23:30:14.989Z',
      __v: 0
    },
    memberUserData: {
      _id: '650b0b097ec0ca45ad0b631c',
      username: 'Bright Kingsley',
      email: 'briggskvngzz@gmail.com',
      tag: '@Bright16952225372230.36',
      connections: [],
      groups: [],
      photo: 'https://lh3.googleusercontent.com/a/ACg8ocK3vaDtlz1-pjVYVpFHq_bzsfPh24hA5uXyCMHCMJma6is=s96-c',
      createdAt: '2023-09-20T15:08:57.233Z',
      updatedAt: '2023-09-20T15:08:57.233Z',
      __v: 0
    }
  }
 
 */
