import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { FcmToken } from "@/models";
import { stringToObjectId } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { fcmToken } = await request.json();

    if (!fcmToken) throw new Error("Invalid FcmToken");

    const serverSession = await getServerSession(authOptions);

    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Invalid user");

    const parsedUserID = stringToObjectId(serverSession.user.id);

    const fcmTokenDoc = await FcmToken.create({
      //   userID: parsedUserID,
      userID: serverSession.user.id,
      token: fcmToken,
    });

    if (!fcmTokenDoc) throw new Error("Couldn't Create FCM Document ");
    return NextResponse.json({ token: fcmTokenDoc.token });
  } catch (error) {
    return NextResponse.json(null);
  }
}
