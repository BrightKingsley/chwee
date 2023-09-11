import Link from "next/link";
import { Notification, Modal } from "@/components";
import { useContext } from "react";
import { ModalContext, NotificationContext } from "@/context";

export default function Home() {
  return (
    <div>
      <h1>NAVIGATE TO CHAT</h1>
      <Link href="/events">EVENTS</Link>
    </div>
  );
}
