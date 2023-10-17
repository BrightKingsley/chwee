import { NextResponse, NextRequest } from "next/server";

import { createGroup, deleteAllGroups, exitGroup, getGroups } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const groups = await getGroups({});

    if (!groups) return NextResponse.json({ error: "Couldnt get Groups" });

    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      description,
      password,
      photo,
      tag,
    }: {
      name: string;
      description: string;
      password: string | boolean;
      photo: string;
      tag: string;
    } = await request.json();

    console.log({
      name,
      description,
      password,
      photo,
      tag,
    });

    const serverSession = await getServerSession(authOptions);

    const user = serverSession?.user;

    console.log("CREATE_GROUP_USER_SESSSION", { user });

    if (!(user && user.id)) throw new Error("Unauthorized Access");

    // if (!ID)
    //   return NextResponse.json({
    //     error: {
    //       message: "Please Provide a name and description for the group",
    //     },
    //   });

    console.log("CREATE_GROUP-data", name, description, password);

    if (!(name && description && tag && photo))
      return NextResponse.json({
        message: "Please Provide a group name, tag and description",
      });

    if (
      description.toLocaleLowerCase() === "general chat" ||
      description.toLocaleLowerCase() === "generalchat" ||
      description.toLocaleLowerCase() === "gegeneralchat"
    )
      return NextResponse.json({
        error: {
          message: '"general chat" is a reserved name',
        },
      });
    const group = await createGroup({
      ownerID: user.id,
      name,
      description,
      password,
      photo,
      tag,
    });

    if (!group) throw new Error("Couldnt Create Group");

    return NextResponse.json(group);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

type PostProps = {
  params: {
    ID: string;
  };
};
