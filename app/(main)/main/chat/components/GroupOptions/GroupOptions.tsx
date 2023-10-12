"use client";
import { IconButton } from "@/components/mui";
import { OptionsMenu } from "@/components/shared";
import { BASE_URL } from "@/constants/routes";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function GroupOptions({ groupID }: { groupID: string }) {
  const [showOptions, setShowOptions] = useState(false);

  const exitGroup = async () => {
    const res = await fetch(`${BASE_URL}/api/groups/group`);
  };

  return (
    <div className="w-fit relative">
      <IconButton onClick={() => setShowOptions((prev) => !prev)}>
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
      </IconButton>
      <div className="absolute -bottom-24 right-0">
        <OptionsMenu
          show={showOptions}
          options={[
            {
              label: "exit group",
              onClick: () => {
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
