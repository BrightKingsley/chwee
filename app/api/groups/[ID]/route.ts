import { NextResponse, NextRequest } from "next/server";

import { getGroup, createGroup, deleteGroup } from "@/lib/db";


type GetProps = {
  params: {
    ID: string;
  };
};

//pass 281019512623462
export async function GET(request: NextRequest,{params:{ID}}:GetProps) {
  try {

    const {searchParams} = new URL(request.url)
    
    const password = searchParams.get("password");

    // const {password} = await request.json()
    const group = await getGroup({ groupID:ID, password:password ? password:undefined });

    console.log("GROUP", group);

    if (!group)
      return NextResponse.json({ error: { message: "Couldnt get Groups" } });

    return NextResponse.json({ group});
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
    const { name, description, password } = await request.json();

    console.log("CREATE_GROUP-data",name, description, password)

    if (!(name && description))
      return NextResponse.json({
        error: {
          message: "Please Provide a name and description for the group",
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
