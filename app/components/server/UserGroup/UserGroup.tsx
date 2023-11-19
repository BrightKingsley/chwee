import { getGroupByID } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Card, ListItem } from "@/app/components/mui";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import LockLineIcon from "remixicon-react/LockLineIcon";
import LockUnlockLineIcon from "remixicon-react/LockUnlockLineIcon";
import { GroupInfo } from "@/types/models";
import { use } from "react";
import { GROUPS } from "@/constants/routes";

const getGroup = async (groupID: string) => {
  return await getGroupByID({ groupID });
};

export default function UserGroup({ groupID }: { groupID: string }) {
  const group = use(getGroup(groupID));

  if (!group) return null;

  return (
    <Link
      href={`${GROUPS}/info/${group.tag}`}
      className="rounded-md shrink-0 w-80 !whitespace-nowrap text-ellipsis px-[2px]"
    >
      <Card className="border-[1px] w-full">
        <ListItem className="flex items-center w-full gap-2">
          <div className="w-16 h-16 rounded-full bg-primary shrink-0 overflow-clip">
            <Image src={group.photo} alt={group.name} fill />
          </div>
          <div className="flex-1 flex flex-col w-[calc(100%-4rem)] px-1">
            <p className="font-bold !whitespace-nowrap overflow-hidden text-ellipsis w-full">
              {group.name}
            </p>
            <small className="text-primary !whitespace-nowrap overflow-hidden text-ellipsis w-full">
              {group.tag}
            </small>
            <div className="flex items-center gap-1">
              <small>{group.members.length} members</small>
              <small>
                {group.hasPassword ? (
                  <LockLineIcon className="w-3 h-3 text-xs text-red-400 fill-red-400" />
                ) : (
                  <LockUnlockLineIcon className="w-3 h-3 text-xs text-green-400 fill-green-400" />
                )}
              </small>
            </div>
          </div>
        </ListItem>
      </Card>
    </Link>
  );
}
