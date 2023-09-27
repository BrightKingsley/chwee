import { SubHeader, Header } from "@/components";
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
    <div>
      <Header
        imgShown={false}
        title="Events"
        trailing={[
          <Link
            key={Math.random()}
            className="active:scale-75 active:bg-primary/40 rounded-full hover:border transition-all duration-150"
            href={`${EVENTS}/create`}
          >
            <PlusIcon className={`w-10 h-10 transition-all duration-200`} />
          </Link>,
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

          // {
          //   label: replaceWith({
          //     character: "-",
          //     replacement: " ",
          //     string: memberInfoLinkFormatted,
          //   }),
          //   link: MEMBER_ACTIONS,
          // },
        ]}
      />{" "}
      {/* <div className="mx-2">{page}</div> */}
      <div className="mx-2">{children}</div>
    </div>
  );
}
