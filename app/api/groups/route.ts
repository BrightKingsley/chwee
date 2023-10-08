import { NextResponse, NextRequest } from "next/server";

import { deleteAllGroups, getGroups } from "@/lib/db";

export async function GET() {
  try {
    const groups = await getGroups({});

    if (!groups) return NextResponse.json({ error: "Couldnt get Groups" });

    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" });
  }
}

export async function DELETE() {
  try {
    const groupsDeleted = await deleteAllGroups();
    if (groupsDeleted !== true)
      return NextResponse.json({
        error: { message: "Could not delete group documents" },
      });

    return NextResponse.json({
      message: "Group documents deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
