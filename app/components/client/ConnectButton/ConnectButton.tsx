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
  variant = "filled",
  className,
}: {
  receiverID: string;
  variant?: "filled" | "outlined" | "gradient" | "text";
  className?: string;
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
      variant={variant}
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
      className={`p-2 font-druk-wide-bold text-white hover:border bg-primary ${className}`}
    >
      <UserAddLineIcon className="w-8 h-8" />
    </IconButton>
  );
}
