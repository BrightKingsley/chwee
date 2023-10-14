import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

    const sessionUser = serverSession?.user;

    console.log({ sessionUserFromGETCONNECTIONS: sessionUser });

    if (!sessionUser) throw new Error("Invalid user");

    const parsedUserID = stringToObjectId(sessionUser.id!);
    const parsedGroupID = stringToObjectId(groupID);

    const user = await User.findById(parsedUserID);
    if (!user?.groups.map((group) => group.toString()).includes(groupID))
      throw new Error("User not a member of this Group");

    const groupMembersDocument = await Group.findById(parsedGroupID).select(
      "members"
    );

    if (!groupMembersDocument) throw new Error("Couldn't find group document");

    const groupMembers = await Promise.all(
      groupMembersDocument.members.map(async (memberID) => {
        const userDoc = await User.findById(memberID);
        if (!userDoc) throw new Error("Couldn't retrieve group document");
        const userInfo = {
          username: userDoc.username,
          tag: userDoc.tag,
          photo: userDoc.photo,
        };

        return userInfo;
      })
    );

    if (!groupMembers) throw new Error("Could not get group members");

    return NextResponse.json(groupMembers);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}
