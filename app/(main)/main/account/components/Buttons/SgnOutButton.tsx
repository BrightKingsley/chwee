"use client";

import { ModalContext, NotificationContext } from "@/context";
import { useContext, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/mui";

export default function SignOutButton() {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  return (
    <Button
      variant="text"
      fullWidth
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
      className="w-full_ p-2 font-bold"
    >
      log out
    </Button>
  );
}
