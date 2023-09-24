"use client";

import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { PlusIcon } from "@heroicons/react/20/solid";
import { m } from "framer-motion";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function CreateChatButton({
  receiverID,
}: {
  receiverID: string;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const { data } = useSession();
  const session: Session | any = data;

  const createChat = async () => {
    const res = await fetch(`${BASE_URL}/api/chats/${session.user.id}`, {
      method: "POST",
      body: JSON.stringify({ receiver: receiverID }),
    });

    const result = await res.json();
    console.log("RESULT", result);
  };

  return (
    <button
      onClick={() =>
        triggerModal({
          message: "Create chat with this user?",
          cancel: () => triggerModal,
          confirm: () => createChat(),
        })
      }
      key={Math.random()}
      className="bg-primary rounded-md p-1 font-druk-wide-bold text-white"
    >
      <PlusIcon className="w-8 h-8" />
    </button>
  );
}
