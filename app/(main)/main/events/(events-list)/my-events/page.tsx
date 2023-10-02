"use client";

import { ListTile } from "@/components/shared";
import { Button } from "@/components/mui";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import { EventCards } from "../../components";

const events = [1, 1, 1, 1, 1, 1];

const eventCards: EventCardProps[] = [
  { name: "Kvng Event", owner: "Kvng" },
  { name: "Kvng Event", owner: "Kvng" },
  { name: "Kvng Event", owner: "Kvng" },
  { name: "Kvng Event", owner: "Kvng" },
];

export default function MyEvents() {
  return (
    <div className="bg-primary/20">
      <div className="relative w-full p-4 flex">
        <EventCards eventCards={eventCards} />
      </div>
      <div className="space-y-2 p-1">
        {events.map((event, i) => (
          <ListTile
            key={i}
            className="bg-white hover:border hover:border-primary pr-2 transition-colors"
            trailing={[
              <Button
                variant="text"
                key={Math.random()}
                className="font-druk-wide-bold text-sm !p-2"
              >
                view
              </Button>,
            ]}
          >
            <div className="flex p-2 rounded-lg gap-2 items-center w-full">
              <div className="bg-primary rounded-full w-12 h-12 overflow-clip">
                <Image fill src={nft} alt="event" />
              </div>
              <div>
                <p>Event Name</p>
              </div>
            </div>
          </ListTile>
        ))}
      </div>
    </div>
  );
}

/*
 <>
      <div className="border w-full h-40 rounded-md p-2 divide-y flex items-center">
        {topContributor ? ( 
        <div className="flex gap-2 items-center">
          {topContributor ? (
            <>
              <div className="w-24 h-24 rounded-full overflow-clip">
                {topContributor ? (
                  <img src={topContributor?.photo} alt="" />
                ) : (
                  <Skeleton />
                )}
              </div>
              <div>
                <p>{topContributor.username || <Skeleton />}</p>
                <p>{topContributor.tag || <Skeleton />}</p>
              </div>
            </>
          ) : (
            <Skeleton />
          )}
        </div>
 ) : (
          <Skeleton />
        )} 
      </div>
    </> 
 */
