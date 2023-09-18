// "use client"

import { SlideIn } from "@/components";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link"
import { CHATS } from '@/constants/routes';
import { Suspense } from "react";
import { ChatClass } from "@/models";
import {URL} from "@/constants/routes"


const actions: number[] = [];

for (let i = 0; i < 10; i++) {
  actions.push(i);
}

const getChats = async():Promise<ChatClass[]> =>{
const res = await fetch(`${URL}/api/chats`, {cache:"no-cache"})
const {chats} = await res.json()

return chats
} 

export default async function Chats() {

  // const res = await fetch("http://localhost:3000/api/chats")
  const chats:ChatClass[] = await getChats() 

  // const res = await fetch("http://localhost:3000/api/chats")
  console.log("works", chats)
  // console.log("CHATS FETCH RES =>",res)

  if(!chats) return null

  return (
    <>{chats.length > 0 ?
      chats.map((chat, i) => (
        <SlideIn key={Math.random()} index={i}>
          <Link
            href={`${CHATS}/${chat._id}`}
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
      )):<div className="flex items-center justify-center w-full h-full bg-red-400">
        <h1>You have no available chats</h1>
      </div>}
    </>
  );
}
