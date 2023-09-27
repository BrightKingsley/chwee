"use client";

import {
  CHAT_NOTIFICATIONS,
} from "@/constants/routes";
import { redirect } from "next/navigation";

export default function Notifications() {
  redirect(CHAT_NOTIFICATIONS);
}
