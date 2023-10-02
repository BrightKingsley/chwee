"use client";
import { SubHeader, Header } from "@/components/shared";
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
    <div className="relative w-full h-full">
      {/* {!pathname.includes(`${CHATS}/` || `${GROUPS}/`) && (
        <> */}
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
      {/* </>
      )} */}
      {/* <div className="mx-2">{page}</div> */}
      <FloatingActionButton pathname={pathname} />
      <div className="mx-2">{children}</div>
    </div>
  );
}
