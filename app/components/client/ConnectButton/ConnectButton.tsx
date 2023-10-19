"use client";

import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import UserAddLineIcon from "remixicon-react/UserAddLineIcon";
import { IconButton } from "@/app/components/mui";
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
    const res = await fetch(`${BASE_URL}/api/connections`, {
      method: "POST",
      body: JSON.stringify({ receiver: receiverID }),
    });

    const result = await res.json();
    console.log("RESULT", result);
    triggerNotification("connect request sent");
  };

  return (
    <IconButton
      title="connect"
      variant="filled"
      color="gray"
      aria-label="connect with user"
      onClick={() =>
        triggerModal({
          message: (
            <p>
              Send{" "}
              <span className="font-bold text-green-400_">connect request</span>{" "}
              to this user?
            </p>
          ),
          cancel: () => triggerModal,
          confirm: () => connectWithUser(),
        })
      }
      className={`${color === "gray" ? "bg-gray-600" : "bg-primary"} ${
        variant === "circle" ? "rounded-full" : "rounded-md"
      }  p-2 font-druk-wide-bold text-white !bg-gray-600 hover:border`}
    >
      <UserAddLineIcon className="w-8 h-8" />
    </IconButton>
  );
}
