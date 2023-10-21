import { ListTile } from "@/app/components/client";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";

const members: number[] = [];

for (let i = 0; i < 10; i++) {
  members.push(i);
}

export default function Notifications() {
  return (
    <div className="w-full py-2 space-y-2 overflow-hidden">
      {members.map((_, i) => (
        <ListTile
          key={Math.random()}
          index={i}
          className="w-full gap-2 bg-white rounded-xl"
        >
          <div className="flex items-center w-full gap-2 p-2 bg-white rounded-lg bg-primary/10_">
            <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
              <Image src={nft} alt="" fill />
            </div>
            <div className="w-full text-left ">
              <p className="font-semibold">king deleted this message</p>

              {/* TODO COMEBACK check how to use three dots to indicate overflowing text */}
              <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
                king deleted this message for some reason
              </p>
            </div>
          </div>
        </ListTile>
      ))}
    </div>
  );
}
