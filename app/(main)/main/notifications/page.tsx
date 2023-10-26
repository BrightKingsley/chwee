import { ListTile } from "@/app/components/client";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getNotifications } from "@/lib/db";
import Link from "next/link";

const members: number[] = [];

for (let i = 0; i < 10; i++) {
  members.push(i);
}

export default async function Notifications() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;
  const userID = serverSession.user.id;
  const userNotifications = await getNotifications({ userID });
  if (!userNotifications) return null;

  return (
    <div className="w-full py-2 space-y-2 overflow-hidden">
      {userNotifications.map((notification, i) => (
        <ListTile index={i} className="w-full gap-2 bg-white rounded-xl">
          <Link
            href={notification.route}
            key={Math.random()}
            className="flex items-center w-full gap-2 p-2 bg-white rounded-lg bg-primary/10_"
          >
            <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
              <Image src={nft} alt="" fill />
            </div>
            <div className="w-full text-left ">
              <p className="font-semibold">{notification.title}</p>

              {/* TODO COMEBACK check how to use three dots to indicate overflowing text */}
              <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                {notification.body}
              </p>
            </div>
          </Link>
        </ListTile>
      ))}
    </div>
  );
}
