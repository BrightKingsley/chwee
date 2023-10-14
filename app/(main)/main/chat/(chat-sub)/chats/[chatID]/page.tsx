import { Header } from "@/components/shared";
import P2pChat from "./P2pChat";
import { getChat, getMessages, getUserByID } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Chat } from "@/models";
import Link from "next/link";
import Image from "next/image";
import { CONNECT } from "@/constants/routes";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { chatID: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return <h1>NO USER</h1>;

  const userID = serverSession.user.id;

  const chatDoc = await Chat.findById(params.chatID);

  const chatConnectionID = chatDoc?.members.filter(
    (member) => member.toString() != userID
  )[0];

  if (!chatConnectionID) return null;

  const connectionDoc = await getUserByID({
    userID: chatConnectionID,
  });
  if (!connectionDoc) return null;

  // const { searchParams } = new URL(request.url);
  // if (!searchParams) return null;

  // if (!roomType || !(roomType === "group" || roomType === "p2p"))
  //   throw new Error("Invalid RoomType");

  // TODO try fetching messages here instead of a useEffect in the messages component
  // _ _ _ _ did, did'nt work

  return (
    <>
      <Header
        title={connectionDoc.username}
        leading={[
          <Link key={Math.random()} href={`${CONNECT}/${connectionDoc.tag}`}>
            <Image
              src={connectionDoc.photo}
              width={150}
              height={150}
              className="rounded-full w-8 h-8 bg-primary"
              alt="group photo"
            />
          </Link>,
        ]}
      />
      <P2pChat params={params} />
    </>
  );
}
