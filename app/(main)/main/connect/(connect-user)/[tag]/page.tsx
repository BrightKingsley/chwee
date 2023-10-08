import { getUserByID, getUserByTag } from "@/lib/db";
import Image from "next/image";
import { Button, Card, ListItem } from "@/components/mui";
import { ConnectOptions } from "@/components/shared";

import Link from "next/link";
import nft from "@/assets/images/nft.jpg";
import { group } from "console";
import { ConnectionCard, GroupAvatar } from "@/components/shared";

const avatars = { groups: [1, 1, 1, 1] };

export default async function UserInfo({
  params,
}: {
  params: { tag: string };
}) {
  const user = await getUserByTag({ tag: params.tag });

  if (!user) return <h1>USER UNAVAILABLE</h1>;
  const userConnections = user.connections.slice(0, 5);

  return (
    <div className="flex flex-col w-full p-2 pt-20 space-y-6">
      <div className="mx-auto space-y-2 w-fit">
        <div className="relative mx-auto w-fit">
          <div className="w-32 h-32 rounded-full overflow-clip">
            <Image fill src={user.photo} alt={user.username} />
          </div>
          <div className="absolute top-2 -right-6">
            <ConnectOptions userID={user._id.toString()} />
          </div>
        </div>
        <div className="text-center">
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
          {avatars.groups.length > 0 ? (
            avatars.groups.map((group, i) => (
              <GroupAvatar key={i} groupID={group.toString()} />
            ))
          ) : (
            <p>This user {"doesn't"} belong to any groups</p>
          )}
        </div>
      </div>
    </div>
  );
}
