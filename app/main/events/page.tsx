import { MY_EVENTS } from "@/constants/routes";
import { redirect } from "next/navigation";

export default function Events() {
  // redirect(MY_EVENTS);

  return (
    <div className="flex items-center justify-center w-screen h-screen text-center text-primary">
      <p>Coming Soon...</p>
    </div>
  );
}
