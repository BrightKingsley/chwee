"use client";

import { Spinner } from "@/components/mui";
import { BASE_URL, GROUPS } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function JoinGroupTrigger({
  groupID,
  groupName,
}: {
  groupID: string;
  groupName: string;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const joinGroup = async () => {
    setLoading(true);
    triggerNotification("Processing join request");
    const res = await fetch(`${BASE_URL}/api/groups/${groupID}`, {
      method: "PUT",
    });
    const group = await res.json();
    console.log({ group });
    if (!group) {
      setLoading(false);
      triggerNotification("You couldn't be added to this group");
      return push(`${GROUPS}`);
    }
    setLoading(false);
    push(`${GROUPS}`);
    return triggerNotification(
      <Link href={`${GROUPS}/${groupID}`}>Joined Successfully</Link>
    );
  };

  const cancelJoinGroup = () => {
    triggerModal({});
    push(`${GROUPS}`);
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
