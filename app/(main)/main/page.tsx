import Link from "next/link";
import { Notification, Modal } from "@/components";
import { useContext } from "react";
import { ModalContext, NotificationContext } from "@/context";
import { DASHBOARD } from "@/constants/routes";

export default function Home() {
  return (
    <div>
      <h1>NAVIGATE TO DaSHBOard</h1>
      <Link href={DASHBOARD}>Dashboard</Link>
    </div>
  );
}
