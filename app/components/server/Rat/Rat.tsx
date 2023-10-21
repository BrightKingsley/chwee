import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ONBOARDING } from "@/constants/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { use } from "react";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export default function Rat() {
  const serverSession = use(getSession());
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return redirect(ONBOARDING);

  return <></>;
}
