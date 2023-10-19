"use client";
import { IconButton } from "@/app/components/mui";
import { ACCOUNT } from "@/constants/routes";
import Link from "next/link";
import EditLineIcon from "remixicon-react/EditLineIcon";

export default function EditAccountButton() {
  return (
    <IconButton
      variant="filled"
      color="gray"
      className="rounded-full bg-gray-600"
    >
      <Link href={`${ACCOUNT}?edit=true`}>
        <EditLineIcon className="w-8 h-8" />
      </Link>
    </IconButton>
  );
}
