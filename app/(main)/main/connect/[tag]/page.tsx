import { getUserByID, getUserByTag } from "@/lib/db";
import Image from "next/image";
import { Button, Card, ListItem } from "@/components/mui";
import { ConnectButton } from "../components";

import Link from "next/link";
import nft from "@/assets/images/nft.jpg";
import { group } from "console";
import { ConnectionCard, GroupAvatar } from "@/components/shared";

const cards = { connections: [1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1] };

const avatars = { groups: [1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1] };

export default async function UserInfo({
  params,
}: {
  params: { tag: string };
}) {
  const user = await getUserByTag({ tag: params.tag });

  const userConnections = cards.connections.slice(0, 5);

  if (!user) return null;

  return (
    <div className="space-y-6 flex flex-col pt-20 p-2 w-full">
      <div className="w-fit mx-auto space-y-2">
        <div className="relative w-fit mx-auto">
          <div className="w-32 h-32 rounded-full overflow-clip">
            <Image fill src={user.photo} alt={user.username} />
          </div>
          <div className="absolute top-2 -right-6">
            <ConnectButton
              receiverID={user._id.toString()}
              color="gray"
              variant="circle"
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-druk-wide-bold">{user.username}</h2>
          <p>{user.tag}</p>
        </div>
      </div>
      <div>
        <p className="font-bold">Connections</p>
        <div className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 grid-rows-2 lg:grid-rows-1 gap-1 px-2">
          {userConnections.map((connect) => (
            <ConnectionCard key={connect} userTag={connect.toString()} />
          ))}
          <ListItem className="!p-0 col-span-1 row-span-1 border-[1px]">
            <div className="w-full h-full flex items-center justify-center">
              +{cards.connections.slice(5, -1).length}
            </div>
          </ListItem>
        </div>
      </div>
      <div>
        <p className="font-bold">Groups</p>
        <div className="flex items-center w-full_ overflow-auto p-2 pt-0 gap-2">
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
