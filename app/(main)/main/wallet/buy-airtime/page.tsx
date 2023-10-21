import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Header } from "@/app/components/client";
import { ONBOARDING } from "@/constants/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BuyAirtime from "./BuyAirtime";
import { getUserByID, getWallet } from "@/lib/db";
import { User } from "@/models";

export default async function Airtime() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return redirect(ONBOARDING);
  const userDoc = await User.findById(serverSession.user.id);

  const userWallet = await getWallet({ ownerID: serverSession.user.id });

  if (!userDoc || !userWallet) return redirect(ONBOARDING);

  return (
    <div className="flex flex-col space-y-3">
      <div className="shrink-0">
        <Header title="Airtime" />
      </div>
      <BuyAirtime balance={userWallet.balance} userPhone={userDoc.phone} />
    </div>
  );
}
