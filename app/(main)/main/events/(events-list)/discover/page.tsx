import { ListTile, SearchBar } from "@/components";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const events = [1, 1, 1, 1, 1, 1, 1, 1];

export default function DiscoverEvents() {
  return (
    <div className="space-y-2 bg-primary/20 p-1">
      <SearchBar colection="events" />
      {events.map((event, i) => (
        <ListTile
          key={i}
          className="bg-white"
          trailing={[
            <button
              key={Math.random()}
              className="bg-primary rounded-md px-3 py-1 font-druk-wide-bold text-white text-sm"
            >
              join
            </button>,
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
