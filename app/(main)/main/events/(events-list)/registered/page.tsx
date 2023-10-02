import { ListTile } from "@/components/shared";
import { Button } from "@/components/mui";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import { Header } from "@/components/shared";
import { EventCards } from "../../components";

const events = [1, 1, 1, 1, 1, 1];

const eventCards: EventCardProps[] = [
  { name: "Kvng Event", owner: "Kvng" },
  { name: "Kvng Event", owner: "Kvng" },
  { name: "Kvng Event", owner: "Kvng" },
  { name: "Kvng Event", owner: "Kvng" },
];

export default async function Registered() {
  return (
    <div className="space-y-2 bg-primary/20 p-1">
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
              enter
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
  );
}
