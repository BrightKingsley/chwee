import { redirect } from "next/navigation";
import { LOGIN } from "@/constants/routes";

export default function Auth() {
  redirect(LOGIN);
}
