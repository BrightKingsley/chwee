import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { beamsClient } from "@/lib/config/pusherBeams";

export async function GET(request: NextRequest) {
  try {
    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("COuldn't athenticate user");
    const userID = serverSession.user.id;

    const beamsToken = beamsClient.generateToken(userID);
    return NextResponse.json(beamsToken);
  } catch (error) {
    console.error("PUSHER_BEAMS_AUTH", { error });
    return NextResponse.json(null);
  }
}
