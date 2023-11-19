import Link from "next/link";
import { Notification, Modal, PortalElements } from "@/app/components/client";
import { DASHBOARD } from "@/constants/routes";

export default function Home() {
  return (
    <div>
      <h1>NAVIGATE TO DaSHBOard</h1>
      <Link href={DASHBOARD}>Dashboard</Link>
      <PortalElements />
    </div>
  );
}
