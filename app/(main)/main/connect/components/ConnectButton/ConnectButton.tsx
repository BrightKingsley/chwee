"use client";

import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { IconButton } from "@/components/mui";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function ConnectButton({
  receiverID,
  color,
  variant,
}: {
  receiverID: string;
  variant?: "circle" | "rounded";
  color?: "primary" | "gray";
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const { data } = useSession();
  const session: Session | any = data;

  console.log("CREAT CHAT SESSION: ", session);

  const connectWithUser = async () => {
    if (!session.user.id) return;
    const res = await fetch(`${BASE_URL}/api/chats/${session.user.id}`, {
      method: "POST",
      body: JSON.stringify({ receiver: receiverID }),
    });

    const result = await res.json();
    console.log("RESULT", result);
    triggerNotification("connect request sent");
  };

  return (
    <IconButton
      color="gray"
      onClick={() =>
        triggerModal({
          message: "Send connect request to this user?",
          cancel: () => triggerModal,
          confirm: () => connectWithUser(),
        })
      }
      key={Math.random()}
      className={`${color === "gray" ? "bg-gray-600" : "bg-primary"} ${
        variant === "circle" ? "rounded-full" : "rounded-md"
      }  p-2 font-druk-wide-bold text-white hover:border hover:border-gray-700 hover:text-gray-700`}
    >
      <PersonAddOutlinedIcon className="w-8 h-8" />
    </IconButton>
  );
}
