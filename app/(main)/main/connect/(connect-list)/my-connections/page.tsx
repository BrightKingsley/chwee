import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ListTile, MessageButton } from "@/app/components/client";
import { getChatsByMembersID, getUserByID } from "@/lib/db";
import { UserIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";
import { ConnectButton } from "@/app/components/client";
import Link from "next/link";
import { CONNECT } from "@/constants/routes";
import Image from "next/image";
import { use } from "react";

export default async function MyConnections() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;
  const res = await getUserByID({
    userID: serverSession.user.id,
  });

  const user = res;

  // @ts-ignore
  if (!user) return <h1>Error fetching Users</h1>;

  const connections = user.connections;
  return connections.length > 0 ? (
    connections.map(async (connection, i) => (
      <Connection
        index={i}
        userID={serverSession.user.id!}
        connectionID={connection.toString()}
        key={i}
      />
    ))
  ) : (
    <p className="text-center">You have no connections available</p>
  );
}

const getUserConnection = async (userID: string) => {
  return await getUserByID({
    userID,
  });
};

const getConnectionChat = async (members: [string, string]) => {
  return await getChatsByMembersID(members);
};

function Connection({
  connectionID,
  userID,
  index,
}: {
  connectionID: string;
  index: number;
  userID: string;
}) {
  const res = use(getUserConnection(connectionID));
  const user = res;
  const chat = use(getConnectionChat([userID, connectionID]));

  console.log({ GOTTEN_CHAT: chat });

  if (!user) return null;
  return (
    <ListTile
      key={index}
      trailing={[
        <MessageButton
          key={user._id.toString()}
          chatID={chat ? chat._id : null}
          users={[userID, connectionID]}
        />,
      ]}
      index={index}
      className="w-full gap-2 pr-2 bg-white rounded-xl md:col-span-1"
    >
      <Link
        href={`${CONNECT}/${user.tag}`}
        className="flex items-center flex-1 gap-2 py-3 pl-2 w-full_ "
      >
        <div className="flex items-center justify-center w-10 h-10 text-gray-200 rounded-full overflow-clip shrink-0 bg-primary">
          {user.photo ? (
            <Image src={user.photo} alt="" fill />
          ) : (
            <UserIcon className="w-8 h-8" />
          )}
        </div>
        <div className="w-full text-left ">
          <p className="font-bold">{user.username}</p>
          <p className="text-sm text-gray-600 overflow-ellipsis overflow-hidden max-w-[10rem]">
            {user.tag}
          </p>
        </div>
      </Link>
    </ListTile>
  );
}
