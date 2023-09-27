// "use client"

import { ListTile } from "@/components";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";
import { Suspense } from "react";
import { GroupClass } from "@/models";
import { BASE_URL } from "@/constants/routes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const actions: number[] = [];

for (let i = 0; i < 10; i++) {
  actions.push(i);
}

const getGroups = async (session: Session): Promise<GroupClass[] | null> => {
  if (!session.user.id) return null;
  const res = await fetch(`${BASE_URL}/api/groups`, {
    cache: "no-cache",
    headers: {
      user_id: session.user.id,
    },
  });

  const data = await res.json();

  if (!data) return null;

  const { groups } = data;

  if (!groups) return null;

  return groups;
};

export default async function Groups() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession) return null;

  const groups: GroupClass[] | null = await getGroups(serverSession);

  if (!groups) return null;

  return (
    <>
      {groups?.length > 0 ? (
        groups.map((group, i) => (
          <ListTile key={Math.random()} index={i}>
            <Link
              href={`${GROUPS}/${group._id}`}
              className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
            >
              <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
                <Image src={nft} alt="" fill sizes="" priority />
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
        <div className="flex items-center justify-center w-full h-full bg-red-400">
          <h1>You have no available groups</h1>
        </div>
      )}
    </>
  );
}
