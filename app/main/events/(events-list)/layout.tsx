import { SubHeader, Header } from "@/app/components/client";
import { IconButton } from "@/app/components/mui";
import {
  DISCOVER_EVENTS,
  REGISTERED_EVENTS,
  MY_EVENTS,
  EVENTS,
} from "@/constants/routes";
import { replaceWith, formatLink } from "@/lib/utils";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sticky flex flex-col h-screen">
      <div className="">
        <Header
          imgShown={false}
          title="Events"
          trailing={[
            <IconButton
              key={Math.random()}
              title="create event"
              aria-label="create event"
              className="rounded-full border !text-gray-700 !fill-gray-700"
            >
              <Link
                className="flex items-center justify-center"
                key={Math.random()}
                href={`${EVENTS}/create`}
              >
                <PlusIcon className={`w-10 h-10`} />
              </Link>
            </IconButton>,
          ]}
        />
        <SubHeader
          sublinks={[
            {
              label: formatLink({
                at: "events/",
                get: "last",
                string: MY_EVENTS,
              }),
              link: MY_EVENTS,
            },
            {
              label: formatLink({
                at: "events/",
                get: "last",
                string: DISCOVER_EVENTS,
              }),
              link: DISCOVER_EVENTS,
            },
            {
              label: formatLink({
                at: "events/",
                get: "last",
                string: REGISTERED_EVENTS,
              }),
              link: REGISTERED_EVENTS,
            },
          ]}
        />
      </div>
      <div className="mx-2 flex-1 overflow-auto">{children}</div>
    </div>
  );
}
