import { getUserByID } from "@/lib/db";
import { ListItem } from "@/app/components/mui";
import Link from "next/link";
import { CONNECT } from "@/constants/routes";
import Image from "next/image";
import { use } from "react";

const getUser = async (userID: string) => {
  return await getUserByID({ userID });
};

export default function ConnectionCard({ userID }: { userID: string }) {
  const user = use(getUser(userID));

  if (!user) return null;

  return (
    <ListItem className="aspect-square !p-0 col-span-1 row-span-1 overflow-clip border-[1px] !whitespace-nowrap !overflow-ellipsis">
      <Link href={`${CONNECT}/${user?.tag}`} className="w-full h-full">
        <div className="relative w-full h-full after:absolute a">
          <Image
            src={user.photo}
            alt={user.username}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 z-10 w-full p-1 bg-white">
            <p className="text-xs font-extrabold">{user?.username}</p>
            <small className="text-xs">{user?.tag}</small>
          </div>
        </div>
      </Link>
    </ListItem>
  );
}
