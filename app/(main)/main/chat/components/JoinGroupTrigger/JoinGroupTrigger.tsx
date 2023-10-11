"use client";

import { BASE_URL, GROUPS } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function JoinGroupTrigger({
  groupID,
  groupName,
}: {
  groupID: string;
  groupName: string;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const { push } = useRouter();

  const joinGroup = async () => {
    const res = await fetch(`${BASE_URL}/api/groups/${groupID}`, {
      method: "PUT",
    });
    const group = await res.json();
    console.log({ group });
    if (!group)
      return triggerNotification("You couldn't be added to this group");
    triggerNotification(
      <Link href={`${GROUPS}/${groupID}`}>Joined Successfully</Link>
    );

    return push(`${GROUPS}`);
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
          Join <span className="text-primary font-bold">{groupName}</span>{" "}
          group?
        </p>
      ),
    });
  }, []);

  return <></>;
}
