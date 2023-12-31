import { Header, SubHeader } from "@/app/components/client";
import { formatLink, replaceWith } from "@/lib/utils";
import { AUTH, CHAT_NOTIFICATIONS, OTHER } from "@/constants/routes";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatLinkFormatted = formatLink({
    string: CHAT_NOTIFICATIONS,
    at: "notifications/",
    get: "last",
  });

  const otherLinkFormatted = formatLink({
    string: OTHER,
    at: "notifications/",
    get: "last",
  });

  return (
    <div className="flex flex-col h-screen bg-primary/10">
      <Header title={`Notifications`} />
      <div className="h-full mx-2 space-y-2 overflow-y-auto">{children}</div>
    </div>
  );
}
