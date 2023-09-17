import { pusherServer } from "@/lib/config";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data =await request.text();
  const [socketID, channelName] = data
    .split("&")
    .map((str:string) => str.split("=")[1]);

    console.log("SOCKET_TINZ", socketID, channelName)


  const id = nanoid();

  const presenceData = {
    user_id: id,
    user_data: { user_id: id },
  };

  const auth = pusherServer.authorizeChannel(
    socketID,
    channelName,
    presenceData
  );


  return NextResponse.json(auth)
}
