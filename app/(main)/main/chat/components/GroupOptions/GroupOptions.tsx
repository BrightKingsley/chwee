"use client";
import { IconButton } from "@/components/mui";
import { OptionsMenu } from "@/components/shared";
import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";

export default function GroupOptions({
  groupID,
  userID,
  groupName,
}: {
  groupID: string;
  userID: string;
  groupName: string;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const exitGroup = async () => {
    const res = await fetch(`${BASE_URL}/api/groups`, {
      method: "DELETE",
      body: JSON.stringify({
        userID,
        groupID,
      }),
      cache: "no-cache",
    });
    const data = await res.json();
    if (data.message !== "success")
      return triggerNotification("Couldn't exit group successfully");
    return triggerNotification("Exited group successfully");
  };

  return (
    <div className="relative w-fit">
      <IconButton onClick={() => setShowOptions((prev) => !prev)}>
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
      </IconButton>
      <div className="absolute right-0 -bottom-24">
        <OptionsMenu
          show={showOptions}
          options={[
            {
              label: "exit group",
              onClick: () => {
                // TODO topped here
                triggerModal({
                  clickToDisable: true,
                  confirm: exitGroup,
                  cancel: triggerModal,
                  message: `Are you sure you want to Exit ${groupName}?`,
                });
                setShowOptions(false);
              },
            },
            {
              label: "start",
              onClick: () => {},
            },
            { label: "block", onClick: () => {} },
          ]}
        />
      </div>
    </div>
  );
}
