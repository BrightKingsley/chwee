import {SubHeader,Header} from "@/components"
import {POLLS,STATS} from "@/constants/routes"
import {replaceWith,formatLink} from "@/lib/utils"

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header imgShown={false} title="Events" />

<SubHeader
        sublinks={[
          {
            label: formatLink({
              at: "events/",
              get: "last",
              string: POLLS,
            }),
            link: POLLS,
          },
          {
            label: formatLink({
              at: "events/",
              get: "last",
              string: STATS,
            }),
            link: STATS,
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
      />      {/* <div className="mx-2">{page}</div> */}
      <div className="mx-2">{children}</div>
    </div>
  );
}
