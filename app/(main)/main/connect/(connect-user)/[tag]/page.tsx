// comonents
import { ListItem } from "@/app/components/mui";
import { ConnectionCard, UserGroup } from "@/app/components/server";
import { ConnectOptions } from "@/app/components/client";
// next
import Image from "next/image";
//functions
import { getChat, getUserByTag } from "@/lib/db";
import Link from "next/link";
import { CONNECT } from "@/constants/routes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Chat } from "@/models";
import { stringToObjectId } from "@/lib/utils";

export default async function UserInfo({
  params,
}: {
  params: { tag: string };
}) {
  // get user data

  const serverSession = await getServerSession(authOptions);

  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;

  const userID = serverSession.user.id;

  const decodedTag = decodeURIComponent(params.tag);
  const user = await getUserByTag({ tag: decodedTag });

  if (!user)
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-pattern">
        <h1>User Unavailable</h1>
      </div>
    );

  const parsedUserID = stringToObjectId(userID);
  const parsedConnectID = stringToObjectId(user?._id);

  //TODO: Implemenet find chat with user and pass chatID to connect options
  const userChat = await Chat.findOne({
    $and: [
      { members: { $in: [parsedUserID] } },
      { members: { $in: [parsedConnectID] } },
    ],
  });

  // validate user data

  const userConnections = user.connections.slice(0, 5);

  return (
    <div className="flex flex-col w-full h-screen p-2 pt-20 space-y-6 bg-pattern">
      <div className="mx-auto space-y-16 w-fit">
        <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
          <Link href={`${CONNECT}/${decodedTag}/display-photo`}>
            <div className="z-10 w-32 h-32 rounded-full overflow-clip">
              <Image fill src={user.photo} alt={user.username} />
            </div>
          </Link>
          <div className="absolute w-60 h-60">
            <ConnectOptions
              userTag={decodedTag}
              chatID={userChat ? (userChat._id as string) : null}
              connectID={user._id}
              userID={user._id.toString()}
            />
          </div>
        </div>
        <div className="text-center ">
          <h2 className="font-druk-wide-bold">{user.username}</h2>
          <p>{user.tag}</p>
        </div>
      </div>
      <div>
        <p className="font-bold">Connections</p>
        {userConnections.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-1 px-2 grid-rows-2_ sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:grid-rows-1">
            {userConnections.map((connect) => (
              <ConnectionCard
                key={connect.toString()}
                userID={connect.toString()}
              />
            ))}
            {userConnections.slice(5, -1).length > 0 && (
              <ListItem className="!p-0 col-span-1 row-span-1 border-[1px]">
                <div className="flex items-center justify-center w-full h-full">
                  +{userConnections.slice(5, -1).length}
                </div>
              </ListItem>
            )}
          </div>
        ) : (
          <p>This user has no available connections</p>
        )}
      </div>
      <div>
        <p className="font-bold">Groups</p>
        <div className="flex items-center gap-2 p-2 pt-0 overflow-auto w-full_">
          {user.groups.length > 0 ? (
            user.groups.map((group, i) => (
              <UserGroup key={i} groupID={group.toString()} />
            ))
          ) : (
            <p>This user {"doesn't"} belong to any groups</p>
          )}
        </div>
      </div>
    </div>
  );
}
