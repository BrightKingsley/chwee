"use client";

import { Button, IconButton } from "@/app/components/mui";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import JoinGroupTrigger from "../JoinGroupTrigger/JoinGroupTrigger";
import { useState } from "react";

export default function GroupNotFoundActions({ groupID }: { groupID: string }) {
  const [joinGroup, setJoinGroup] = useState(false);
  return (
    <div className="flex">
      <IconButton>
        <RefreshLineIcon className="text-2xl" />
      </IconButton>
      <Button onClick={() => setJoinGroup(true)} variant="gradient">
        Request Membership
      </Button>
      <Button variant="text">Remove from Groups list</Button>
    </div>
  );
}
