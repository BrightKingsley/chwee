// "use client"

import { SlideIn } from "@/components";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";
import { Suspense } from "react";
import { GroupClass } from "@/models";
import { URL } from "@/constants/routes";

const actions: number[] = [];

for (let i = 0; i < 10; i++) {
  actions.push(i);
}

const getGroups = async (): Promise<GroupClass[] | null> => {
  const res = await fetch(`${URL}/api/groups`, { cache: "no-cache" });

  
  const data = await res.json()
  
  if(!data) return null
console.log("DATA", data)

  const { groups } = await res.json();

  if(!groups) return null

  return groups;
};

export default async function Groups() {
  // const res = await fetch("http://localhost:3000/api/groups")
  const groups: GroupClass[] = await getGroups();

  // const res = await fetch("http://localhost:3000/api/groups")
  console.log("works", groups);
  // console.log("GROUPS FETCH RES =>",res)

  if (!groups) return null;

  return (
    <>
      {groups.length > 0 ? (
        groups.map((group, i) => (
          <SlideIn key={Math.random()} index={i}>
            <Link
              href={`${GROUPS}/${group._id}`}
              className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
            >
              <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
                <Image src={nft} alt="" fill sizes="" priority />
              </div>
              <div className="w-full text-left ">
                <p className="font-semibold">king__ deleted this message</p>
                <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                  king deleted this message for some reason
                </p>
              </div>
            </Link>
          </SlideIn>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-red-400">
          <h1>You have no available groups</h1>
        </div>
      )}
    </>
  );
}
