import { getGroupInfo } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Card, ListItem } from "@/components/mui";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import LockOutlined from "@mui/icons-material/LockOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import { GroupInfo } from "@/types/models";
import { use } from "react";

const getGroup = async (groupID: string) => {
  return await getGroupInfo({ groupID });
};

export default function GroupAvatar({ groupID }: { groupID: string }) {
  const group = use(getGroup(groupID));

  if (!group) return null;

  return (
    <Link href={group.tag} className="rounded-md shrink-0 w-60">
      <Card className="border-[1px]">
        <ListItem className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-full overflow-clip">
            <Image src={group.photo} alt={group.name} fill />
          </div>
          <div>
            <p className="font-bold">{group.name}</p>
            <small className="text-primary">{group.tag}</small>
            <div className="flex gap-1 items-center">
              <small>{group.membersCount} members</small>
              <small>
                {/* {group.hasPassword ? (
                  // <LockOutlined className="w-3 h-3 fill-red-400" />
                ) : (
                  <LockOpenOutlined className="w-3 h-3 fill-green-400" />
                )} */}
              </small>
            </div>
          </div>
        </ListItem>
      </Card>
    </Link>
  );
}
