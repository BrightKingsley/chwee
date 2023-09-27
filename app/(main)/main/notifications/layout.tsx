import { Header, SubHeader } from "@/components";
import { formatLink, replaceWith } from "@/lib/utils";
import { AUTH, CHAT_NOTIFICATIONS, OTHER } from "@/constants/routes";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let page = <></>;

  const chatLinkFormatted = formatLink({
    string: CHAT_NOTIFICATIONS,
    at: "s/",
    get: "last",
  });

  const otherLinkFormatted = formatLink({
    string: OTHER,
    at: "s/",
    get: "last",
  });

  // const memberInfoLinkFormatted = formatLink({
  //   string: MEMBER_ACTIONS,
  //   at: "s/",
  //   get: "last",
  // });

  return (
    <div className="h-screen flex flex-col bg-primary/10">
      <Header title={`Notifications`} />
      <SubHeader
        sublinks={[
          {
            label: replaceWith({
              character: "-",
              replacement: " ",
              string: chatLinkFormatted,
            }),
            link: OTHER,
          },
          {
            label: replaceWith({
              character: "-",
              replacement: " ",
              string: otherLinkFormatted,
            }),
            link: CHAT_NOTIFICATIONS,
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
      />

      <div className="space-y-2 mx-2 overflow-y-auto h-full">{children}</div>
    </div>
  );
}
