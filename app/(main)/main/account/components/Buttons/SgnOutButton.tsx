"use client";

import { ModalContext, NotificationContext } from "@/context";
import { useContext, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function SignOutButton() {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  return (
    <button
      onClick={() => {
        console.log("logout clicked");
        triggerModal({
          cancel: () => triggerModal,
          confirm: () => {
            // navigate(AUTH);
            console.log("SIGNING_OUT");

            signOut();
            triggerNotification("User Signed Out");
          },
          message: "Are you sure you want to logout?",
        });
      }}
      className="w-full p-2 font-bold text-white transition-all duration-100 rounded-md bg-primary active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 "
    >
      log out
    </button>
  );
}
