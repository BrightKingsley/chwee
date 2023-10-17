import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import {
  getGroupByID,
  deleteGroup,
  addMemberToGroupByID,
  requestMembership,
  updateGroup,
} from "@/lib/db";
import { Group } from "@/models";
import { stringToObjectId } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const saltRounds = 10;

type GetProps = {
  params: {
    groupID: string;
  };
};

//pass 281019512623462
export async function GET(
  request: NextRequest,
  { params: { groupID } }: GetProps
) {
  try {
    const { searchParams } = new URL(request.url);

    const password = searchParams.get("password");

    const headersList = headers();
    const userID = headersList.get("user_id");

    console.log("GROUP_GET--UERID", userID);

    // const {password} = await request.json()
    const group = await getGroupByID({
      groupID: groupID,
    });

    console.log("GROUP", group);

    if (!group) throw new Error("Couldnt get Groups");

    return NextResponse.json({ group });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error });
  }
}

type PostProps = {
  params: {
    groupID: string;
  };
};

type PatchProps = {
  name?: string;
  description?: string;
  password?: string | boolean;
  photo: string;
  tag: string;
};

export async function PUT(
  request: NextRequest,
  { params: { groupID } }: PostProps
) {
  try {
    const serverSession = await getServerSession(authOptions);

    const { userID } = await request.json();

    if (!(serverSession?.user && serverSession?.user.id))
      throw new Error("Unauthorized Access");

    const sessionUserID = serverSession.user.id;

    const groupDoc = await Group.findById(stringToObjectId(groupID));
    if (!groupDoc) throw new Error("Couldn't retrieve group document");

    // if (sessionUserID !== groupDoc.owner.toString() && sessionUserID !== userID)
    //   throw new Error("Unauthorized!");

    if (
      !(sessionUserID === groupDoc.owner.toString() || sessionUserID === userID)
    )
      throw new Error("Unauthorized!");

    let result;
    if (groupDoc.password.length < 1 || groupDoc.owner.toString() === userID) {
      result = await addMemberToGroupByID({
        groupID,
        userID,
      });
    } else {
      result = await requestMembership({ groupID, userID });
    }

    if (!result) throw new Error("Could'n add member to group");

    return NextResponse.json(result);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { groupID } }: PostProps
) {
  try {
    const body = await request.json();
    const { name, description, photo, tag, password }: PatchProps = body;

    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Invalid User");

    const userID = serverSession.user.id;
    const updateGroupResult = await updateGroup({
      groupID,
      userID,
      name,
      description,
      photo,
      tag,
      password,
    });
    if (!updateGroup) throw new Error("Couldn't update group");
    return NextResponse.json({ message: updateGroupResult });
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { groupID } }: PostProps
) {
  try {
    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Invalid User");

    const userID = serverSession.user.id;
    // if (!(name && id))

    const groupDeleted = await deleteGroup({ groupID, ownerID: userID });

    return NextResponse.json({
      message: groupDeleted,
    });
  } catch (error) {
    return NextResponse.json(null);
  }
}
