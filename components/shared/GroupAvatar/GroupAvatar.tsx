import { getGroupByID } from "@/lib/db";
import { getGroupInfo } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Card, ListItem } from "@/components/mui";
import { GroupInfo } from "@/types/models";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import LockOutlined from "@mui/icons-material/LockOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";

export default async function GroupAvatar({ groupID }: { groupID: string }) {
  // const group = await getGroupInfo({ groupID });

  // if (!group) return null;

  const group: GroupInfo = {
    tag: "@memer",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocL3IgqsG4lZmkfn7f9mknLgmLxH6032uRLjdsMixdBh4A=s96-c",
    name: "memes group",
    membersCount: 10,
    hasPassword: false,
    description: "",
    owner: "me",
  };

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
                {group.hasPassword ? (
                  <LockOutlined className="w-3 h-3 fill-red-400" />
                ) : (
                  <LockOpenOutlined className="w-3 h-3 fill-green-400" />
                )}
              </small>
            </div>
          </div>
        </ListItem>
      </Card>
    </Link>
  );
}
