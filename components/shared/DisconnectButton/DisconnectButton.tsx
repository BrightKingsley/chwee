"use client";

import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import PersonRemoveOutlined from "@mui/icons-material/PersonRemoveOutlined";
import { IconButton } from "@/components/mui";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function DisconnectButton({
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

  const disconnectUser = async () => {
    if (!session.user.id) return;
    const res = await fetch(`${BASE_URL}/api/connections`, {
      method: "DELETE",
      body: JSON.stringify({ receiver: receiverID }),
    });

    const result = await res.json();
    console.log("RESULT", result);
    triggerNotification("connection with this user deleted");
  };

  return (
    <IconButton
      variant="filled"
      color="gray"
      onClick={() =>
        triggerModal({
          message: (
            <p>
              <span className="font-bold text-red-400">Delete</span> this user
              from connections list?
            </p>
          ),
          cancel: () => triggerModal,
          confirm: () => disconnectUser(),
        })
      }
      className={`${color === "gray" ? "bg-primary" : "bg-primary"} ${
        variant === "circle" ? "rounded-full" : "rounded-md"
      }  p-2 font-druk-wide-bold text-white hover:border`}
    >
      <PersonRemoveOutlined className="w-8 h-8" />
    </IconButton>
  );
}
