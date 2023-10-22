"use client";

import { Spinner } from "@/app/components/mui";
import { BASE_URL, GROUPS } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function LeaveGroupTrigger({
  groupID,
  groupName,
  returnURL,
  userID,
}: {
  groupID: string;
  groupName: string;
  returnURL: string;
  userID: string;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const { replace } = useRouter();

  const { data } = useSession();
  const session = data;

  const exitGroup = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/groups/${groupID}/members`, {
        method: "DELETE",
        body: JSON.stringify({
          userID,
          groupID,
        }),
        cache: "no-cache",
      });
      const data = await res.json();
      if (!data && !data.message) {
        setLoading(false);
        return triggerNotification("Something Went wrong");
      }
      setLoading(false);
      triggerNotification(data.message);
      return replace(GROUPS);
    } catch (error) {
      console.error({ error });
      setLoading(false);
      return triggerNotification("Something Went wrong");
    }
  };
  const cancelExitGroup = () => {
    triggerModal({});
    replace(returnURL);
  };

  useEffect(() => {
    triggerModal({
      cancel: cancelExitGroup,
      confirm: () => exitGroup(),
      message: (
        <p>
          Leave{" "}
          <span className="font-bold text-primary">(exit) {groupName}</span>{" "}
          group?
        </p>
      ),
    });
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed w-full backdrop-blur-sm h-full top-0 left-0 flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
    </>
  );
}
