import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { exitGroup, getMembers } from "@/lib/db";
import { stringToObjectId } from "@/lib/utils";
import { User, Group } from "@/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type GetProps = {
  params: {
    groupID: string;
  };
};

export async function GET(
  request: NextRequest,
  { params: { groupID } }: GetProps
) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Invalid user");

    const userID = serverSession.user.id;

    const groupMembers = await getMembers({ groupID, userID });

    return NextResponse.json(groupMembers);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const serverSession = await getServerSession(authOptions);

    const {
      userID,
      groupID,
    }: {
      userID: string;
      groupID: string;
    } = await request.json();

    const sessionUser = serverSession?.user.id;
    if (!sessionUser) throw new Error("Invalid User ID");

    const groupExited = await exitGroup({
      groupID,
      userID,
      sessionUser,
    });
    // if (groupsDeleted !== true)
    //   return NextResponse.json({
    //     error: { message: "Could not delete group documents" },
    //   });
    console.log({ groupExited });

    return NextResponse.json({
      message: groupExited,
    });
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}
