import { CONNECT } from "@/constants/routes";
import { redirect } from "next/navigation";

export default async function Connect() {
  redirect(`${CONNECT}/my-connections`);
}
