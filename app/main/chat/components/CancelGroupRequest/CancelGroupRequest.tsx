"use client";

import { Spinner } from "@/app/components/mui";
import { BASE_URL, GROUPS } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function JoinGroupTrigger({
  groupID,
  groupName,
  returnURL,
  locked,
}: {
  groupID: string;
  groupName: string;
  returnURL: string;
  locked: boolean;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const { push, replace } = useRouter();

  const { data } = useSession();
  const session = data;

  const joinGroup = async () => {
    setLoading(true);
    triggerNotification("Processing join request");
    const res = await fetch(`${BASE_URL}/api/groups/${groupID}`, {
      method: "PUT",
      body: JSON.stringify({ userID: session?.user.id }),
    });
    const group = await res.json();
    console.log({ group });
    if (!group) {
      setLoading(false);
      triggerNotification(
        locked ? "Join request failed" : "You couldn't be added to this group"
      );
      return replace(returnURL);
    }
    setLoading(false);
    replace(returnURL);
    return triggerNotification(
      locked ? (
        "Join request sent successfully"
      ) : (
        <Link replace href={`${GROUPS}/${groupID}`}>
          Joined Successfully Click to enter chat
        </Link>
      )
    );
  };

  const cancelJoinGroup = () => {
    triggerModal({});
    replace(returnURL);
  };

  useEffect(() => {
    triggerModal({
      cancel: cancelJoinGroup,
      confirm: () => joinGroup(),
      message: (
        <p>
          Join <span className="font-bold text-primary">{groupName}</span>{" "}
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
