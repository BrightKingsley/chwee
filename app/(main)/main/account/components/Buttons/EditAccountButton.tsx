"use client";
import { IconButton } from "@/components/mui";
import { ACCOUNT } from "@/constants/routes";
import Link from "next/link";
import Edit from "@mui/icons-material/Edit";

export default function EditAccountButton() {
  return (
    <IconButton
      variant="filled"
      color="gray"
      className="rounded-full bg-gray-600"
    >
      <Link href={`${ACCOUNT}?edit=true`}>
        <Edit className="w-8 h-8" />
      </Link>
    </IconButton>
  );
}
