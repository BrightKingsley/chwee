"use client";
import { IconButton } from "@/app/components/mui";
import { OptionsMenu } from "@/app/components/client";
import { BASE_URL, GROUPS } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function GroupOptions({
  groupID,
  userID,
  groupName,
  ownerID,
}: {
  groupID: string;
  userID: string;
  ownerID: string;
  groupName: string;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

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
      return push(GROUPS);
    } catch (error) {
      console.error({ error });
      setLoading(false);
      return triggerNotification("Something Went wrong");
    }
  };

  const deleteGroup = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/groups/${groupID}`, {
        method: "DELETE",
        cache: "no-cache",
      });
      const data = await res.json();
      if (!data && !data.message) {
        setLoading(false);
        return triggerNotification("Something Went wrong");
      }
      setLoading(false);
      triggerNotification(data.message);
      return push(GROUPS);
    } catch (error) {
      console.error({ error });
      setLoading(false);
      return triggerNotification("Something Went wrong");
    }
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
              label: "leave group",
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
            userID === ownerID
              ? {
                  label: "edit info",
                  onClick: () => push(`${GROUPS}/${groupID}/edit`),
                }
              : null,
            userID === ownerID
              ? {
                  label: "delete group",
                  onClick: () => {
                    triggerModal({
                      clickToDisable: true,
                      confirm: deleteGroup,
                      cancel: triggerModal,
                      message: (
                        <p>
                          Are you sure you want to{" "}
                          <span className="text-red-400">Delete</span>{" "}
                          {groupName} group?
                        </p>
                      ),
                    });
                    setShowOptions(false);
                  },
                }
              : null,
          ]}
        />
      </div>
    </div>
  );
}
