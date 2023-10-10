// "use client"

import { ListTile } from "@/components/shared";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";
import { Suspense } from "react";
import { BASE_URL } from "@/constants/routes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { getGroups } from "@/lib/db";
import { ClientGroup } from "@/types/models";

export default async function Groups() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;

  const groups: ClientGroup[] | null = await getGroups({});

  if (!groups) return null;

  return (
    <>
      {groups?.length > 0 ? (
        groups.map((group, i) => (
          <ListTile key={group._id.toString()} index={i}>
            <Link
              href={`${GROUPS}/${group._id}`}
              className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
            >
              <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
                <Image src={group.photo} alt="" fill sizes="" priority />
              </div>
              <div className="w-full text-left ">
                <p className="font-semibold">{group.name}</p>
                <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                  {group.description}
                </p>
              </div>
            </Link>
          </ListTile>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full mt-40">
          <h1>You have no available groups</h1>
          <XMarkIcon className="w-6 h-6 fill fill-red-400" />
        </div>
      )}
    </>
  );
}
