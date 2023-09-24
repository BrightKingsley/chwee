import { MY_EVENTS } from "@/constants/routes";
import { redirect } from "next/navigation";

export default function Events() {
  redirect(MY_EVENTS);
}
