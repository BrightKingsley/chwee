import { getUserByTag } from "@/lib/db";
import { ListItem } from "@/components/mui";
import Link from "next/link";
import { CONNECT } from "@/constants/routes";
import Image from "next/image";

export default async function ConnectionCard({ userTag }: { userTag: string }) {
  // const user = await getUserByTag({ tag: userTag });

  // if (!user) return null;
  const user = {
    username: "Bright Kingsley",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocIvkwUqSe2THZsPlARbqVbdcf5ob0h9eFKUs4iK_6JUJzc=s96-c",
    tag: "@BrightwyjRe8",
  };

  return (
    <ListItem className="aspect-square !p-0 col-span-1 row-span-1 overflow-clip border-[1px]">
      <Link href={`${CONNECT}/${user?.tag}`} className="w-full h-full">
        <div className="w-full h-full relative after:absolute a">
          <Image
            src={user.photo}
            alt={user.username}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 p-1 z-10 w-full bg-white">
            <p className="font-extrabold text-xs">{user.username}</p>
            <small className="text-xs">{user.tag}</small>
          </div>
        </div>
      </Link>
    </ListItem>
  );
}
