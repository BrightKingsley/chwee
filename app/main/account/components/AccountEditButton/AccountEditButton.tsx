"use client";
import { IconButton } from "@/app/components/mui";
import { ACCOUNT } from "@/constants/routes";
import Link from "next/link";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

export default function EditAccountButton() {
  return (
    <IconButton
      variant="filled"
      color="gray"
      className="rounded-full bg-gray-600"
    >
      <Link href={`${ACCOUNT}?edit=true`}>
        <PencilLineIcon className="w-8 h-8 p-1" />
      </Link>
    </IconButton>
  );
}
