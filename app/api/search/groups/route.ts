import { dbToClientGroup } from "@/lib/utils";
import { Group } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  try {
    const groupsDocs = await Group.find({
      $text: { $search: query },
    });

    if (!groupsDocs) throw new Error("Couldn't retrieve Group Documents");
    const groups = groupsDocs.map((group) => dbToClientGroup(group));

    return NextResponse.json(groups);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null, { status: 500 });
  }
}
