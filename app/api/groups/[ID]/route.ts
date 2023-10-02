import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import { getGroupByID, createGroup, deleteGroup } from "@/lib/db";
import { Group, GroupClass } from "@/models";
import { stringToObjectId } from "@/lib/utils";
import bcrypt from "bcrypt";
import { group } from "console";

const saltRounds = 10;

type GetProps = {
  params: {
    ID: string;
  };
};

//pass 281019512623462
export async function GET(request: NextRequest, { params: { ID } }: GetProps) {
  try {
    const { searchParams } = new URL(request.url);

    const password = searchParams.get("password");

    const headersList = headers();
    const userID = headersList.get("user_id");

    console.log("GROUP_GET--UERID", userID);

    // const {password} = await request.json()
    const group = await getGroupByID({
      groupID: ID,
      password: password ? password : undefined,
    });

    console.log("GROUP", group);

    if (!group)
      return NextResponse.json({ error: { message: "Couldnt get Groups" } });

    return NextResponse.json({ group });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error });
  }
}

type PostProps = {
  params: {
    ID: string;
  };
};

export async function POST(
  request: NextRequest,
  { params: { ID } }: PostProps
) {
  try {
    const {
      name,
      description,
      password,
    }: { name: string; description: string; password: string } =
      await request.json();

    if (!ID)
      return NextResponse.json({
        error: {
          message: "Please Provide a name and description for the group",
        },
      });

    console.log("CREATE_GROUP-data", name, description, password);

    if (!(name && description))
      return NextResponse.json({
        error: {
          message: "Please Provide a name and description for the group",
        },
      });

    if (
      description.toLocaleLowerCase() === "general chat" ||
      description.toLocaleLowerCase() === "generalchat" ||
      description.toLocaleLowerCase() === "gegeneralchat"
    )
      return NextResponse.json({
        error: {
          message: 'The name "general chat" is a reserved name',
        },
      });
    const group = await createGroup({
      ownerID: ID,
      name,
      description,
      password: password ? true : false,
    });

    if (!group)
      return NextResponse.json({ error: { message: "Couldnt Create Groups" } });

    return NextResponse.json(group);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}

type PatchProps = {
  name?: string;
  description?: string;
  password?: string;
  member?: {
    id: string;
    groupPass: string;
  };
  prop: "name" | "description" | "password" | "member";
};

export async function PATCH(
  request: NextRequest,
  { params: { ID } }: PostProps
) {
  try {
    const body = await request.json();
    const { name, description, password, prop, member }: PatchProps = body;

    // headers is for test purposes with thunderclient. Will use sessions (getserverSession) or tokens (getToken)
    const headersList = headers();
    const userID = headersList.get("user_id");
    console.log("OWNER_ID", userID);

    const parsedGroupID = stringToObjectId(ID);

    if (!userID)
      return NextResponse.json({
        error: { message: "Unauthorized access (USERID)" },
      });

    const parsedUserID = stringToObjectId(userID);

    const group = await Group.findById(parsedGroupID);
    if (!group)
      return NextResponse.json(
        { error: { message: "Group document not found" } },
        { status: 400 }
      );

    if (prop === "member" && member && member.id) {
      const parsedMemberID = stringToObjectId(member.id);

      if (!group.password) {
        group.members.push(parsedMemberID!);
        group.save();
        return NextResponse.json(group);
      }

      if (!password)
        return NextResponse.json({
          error: { message: "Unauthorized access (REQUIRES PASSWORD)" },
        });

      const passwordsMatch = await bcrypt.compare(password, group.password);

      if (!passwordsMatch) {
        return NextResponse.json({
          error: { message: "Unauthorized access (WRONG PASSWORD)" },
        });
      }

      group.members.push(parsedMemberID!);
      group.save();

      return NextResponse.json(group);
    }

    if (parsedUserID?.toString() !== group.owner.toString()) {
      console.log("COMPARE OWNER", parsedUserID, group.owner);
      return NextResponse.json({
        error: {
          message: "Unauthorized access (NOT OWNER)",
          ids: {
            sent: parsedUserID,
            actual: group.owner,
          },
        },
      });
    }

    if (prop === "description" && description) {
      // const group = await Group.findByIdAndUpdate(
      //   parsedGroupID,
      //   {
      //     $set: {
      //       description: description,
      //     },
      //   },
      //   { new: true }
      // );
      // if (!group)
      //   return NextResponse.json({
      //     error: { message: "Could not modify group description" },
      //   });

      group.description = description;
      group.save();

      console.log("========REACHEDDDD=========");
      return NextResponse.json(group);
    }

    if (prop === "name" && name) {
      group.name = name;
      group.save();
      console.log("========REACHEDDDD=========");
      return NextResponse.json(group);
    }

    if (prop === "password" && password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // const group = await Group.findByIdAndUpdate(
      //   parsedGroupID,
      //   {
      //     $set: {
      //       password: hashedPassword,
      //     },
      //   },
      //   { new: true }
      // );

      // if (!group)
      //   return NextResponse.json({
      //     error: { message: "Could not modify group description" },
      //   });

      group.password = hashedPassword;
      group.save();

      console.log("========REACHEDDDD=========");
      return NextResponse.json(group);
    }
    return NextResponse.json({ error: { message: "invalid action" } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { ID } }: PostProps
) {
  try {
    const { name, id } = await request.json();

    console.log("NAME__ID", name, id);

    if (!(name && id))
      return NextResponse.json({
        error: {
          message: "Please Provide a Name and Group ID",
        },
      });

    const groupDeleted = await deleteGroup({ groupID: id });

    console.log("GROUP", groupDeleted);

    if (groupDeleted !== true)
      return NextResponse.json({ error: { message: "Couldn't Delete Group" } });

    return NextResponse.json({
      success: {
        message: "Deleted Successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
