// "use client"

import { ListTile } from "@/components";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { CHATS } from "@/constants/routes";
import { Suspense } from "react";
import { ChatClass, UserClass } from "@/models";
import { BASE_URL } from "@/constants/routes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { UserIcon } from "@heroicons/react/20/solid";

const actions: number[] = [];

for (let i = 0; i < 10; i++) {
  actions.push(i);
}

const getChats = async (session: Session): Promise<MessageType[] | null> => {
  if (!session.user.id) return null;
  const res = await fetch(`${BASE_URL}/api/chats`, {
    cache: "no-cache",
    headers: {
      user_id: session.user.id,
    },
  });

  const data = await res.json();

  console.log("CHAT_DATA===>", data);

  if (!data) return null;

  return data;
};

type MessageType = {
  chatData: ChatClass;
  memberUserData: UserClass;
};

export default async function Chats() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession) return null;

  // const res = await fetch("http://localhost:3000/api/chats")
  const chats: MessageType[] | null = await getChats(serverSession);

  // if (!chats) return <h1>NO CHATS</h1>;

  console.log("GOTTEN_CHATS", chats);

  return (
    <>
      {chats && chats?.length > 0 ? (
        chats.map(
          (chat, i) =>
            chat.memberUserData && (
              <ListTile key={Math.random()} index={i}>
                <Link
                  href={`${CHATS}/${chat.chatData._id}`}
                  className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
                >
                  <div className="w-12 h-12 rounded-full overflow-clip shrink-0 bg-primary text-gray-200 flex items-center justify-center">
                    {
                      /* {chat.memberUserData.photo !== undefined &&
                chat.memberUserData.photo ? ( */
                      false ? (
                        <Image
                          src={chat.memberUserData.photo}
                          alt=""
                          fill
                          sizes=""
                          priority
                        />
                      ) : (
                        <UserIcon className="w-8 h-8" />
                      )
                    }
                  </div>
                  <div className="w-full text-left ">
                    <p className="font-semibold">
                      {chat.memberUserData.username}
                    </p>
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                      last message, will do this soon
                    </p>
                  </div>
                </Link>
              </ListTile>
            )
        )
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-red-400 mt-40">
          <h1>You have no available chats</h1>
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
