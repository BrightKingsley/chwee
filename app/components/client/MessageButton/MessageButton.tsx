"use client";
import { IconButton } from "@/app/components/mui";
import Message3LineIcon from "remixicon-react/Message3LineIcon";
import { BASE_URL, CHAT, CHATS } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ClientChat } from "@/types/models";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MessageButton({
  chatID,
  users,
  className,
  variant = "text",
}: {
  chatID: string | null;
  users: [string, string];
  variant?: "filled" | "outlined" | "gradient" | "text";
  className?: string;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const { data } = useSession();
  const session: Session | any = data;

  const { push } = useRouter();

  console.log("CREAT CHAT SESSION: ", session);

  const createChatWithUser = async () => {
    if (!session.user.id) return;
    const res = await fetch(`${BASE_URL}/api/chats`, {
      method: "POST",
      body: JSON.stringify({ members: users }),
    });

    const result = await res.json();

    const chat = result as ClientChat;

    console.log({ ____CREATED_CHAT: chat });

    if (!chat)
      return triggerNotification("Couldn't create chat with this user ");

    console.log("RESULT", result);
    triggerNotification(
      <Link href={`${CHATS}/${chat._id}`}>
        Successful. Click to navigate to chat
      </Link>
    );
  };

  const handleClick = () => {
    console.log({ chatID });

    if (!chatID)
      return triggerModal({
        message: (
          <p>
            <span className="font-bold text-green-400">Create Chat</span> with
            this user?
          </p>
        ),
        cancel: () => triggerModal,
        confirm: () => createChatWithUser(),
      });
    push(`${CHATS}/${chatID}`);
  };

  return (
    <IconButton
      title="message user"
      variant={variant}
      aria-label="message user"
      onClick={handleClick}
      className={className}
    >
      <Message3LineIcon className="w-8 h-8" />
    </IconButton>
  );
}
