"use client";

import { SlideIn } from "@/components";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";

const actions: number[] = [];

for (let i = 0; i < 10; i++) {
  actions.push(i);
}

export default function Groups() {
  return (
    <>
      {actions.map((_, i) => (
        <SlideIn
          key={Math.random()}
          index={i}
          onClick={() => console.log("msg cicked")}
        >
          <Link
            href={`${GROUPS}/${"chatID"}`}
            className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
          >
            <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
              <Image src={nft} alt="" fill />
            </div>
            <div className="w-full text-left ">
              <p className="font-semibold">king deleted this message</p>
              <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                king deleted this message for some reason
              </p>
            </div>
          </Link>
        </SlideIn>
      ))}
    </>
  );
}
