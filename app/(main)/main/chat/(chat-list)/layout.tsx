"use client";
import { SubHeader, Header } from "@/app/components/client";
import { CHATS, GROUPS, CHAT } from "@/constants/routes";
import { replaceWith, formatLink } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FloatingActionButton } from "../components";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative flex flex-col w-full h-screen">
      <div className="shrink-0">
        <Header imgShown={false} title="Chat" />
        <SubHeader
          sublinks={[
            {
              label: formatLink({
                at: `${CHAT}/`,
                get: "last",
                string: CHATS,
              }),
              link: CHATS,
            },
            {
              label: formatLink({
                at: `${CHAT}/`,
                get: "last",
                string: GROUPS,
              }),
              link: GROUPS,
            },
          ]}
        />
      </div>
      <FloatingActionButton pathname={pathname ? pathname : ""} />
      <div className="flex-1 py-1 mx-2 space-y-2 overflow-auto">{children}</div>
    </div>
  );
}
