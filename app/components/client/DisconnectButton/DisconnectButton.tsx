"use client";

import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import UserUnfollowLineIcon from "remixicon-react/UserUnfollowLineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBin2LineIcon";
import { IconButton } from "@/app/components/mui";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function DisconnectButton({
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
      title="disconect"
      aria-label="disconect user"
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
      className={`p-2 font-druk-wide-bold text-white hover:border ${className}`}
    >
      <DeleteBinLineIcon className="w-8 h-8" />
    </IconButton>
  );
}
