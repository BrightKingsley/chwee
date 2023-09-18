import { pusherServer } from "@/lib/config";
import { sendMessage, getMessages } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MessageClass } from "@/models/Message";
import { Chat, Group } from "@/models";
import mongoose from "mongoose";
import { stringToObjectId } from "@/lib/utils";
import { Conversation } from '@/models/Conversation';



type PostProps = {
  params: {
    chatID: string;
  };
};


type GetProps = {
  params: {
    chatID: string;
  };
};


export async function POST(request: NextRequest, {params:{chatID}}:PostProps) {
  try {
    const {
      message,
      roomType,
    }: { message: MessageClass;roomType: "group" | "p2p" } =
      await request.json();


      console.log("SENT_MESAGE", message)

    const parsedChatID = stringToObjectId(chatID);
    const parsedSenderID = stringToObjectId(message.sender.toString());

    if (
      !message ||
      !(message.imageContent || message.textContent) ||
      !parsedSenderID
    )
      return NextResponse.json({
        error: { message: "no message content sent" },
      });

    if (roomType === "group") {
      console.log("ROOM_TYPE", roomType)
      // Find the group by its ID
      const group = await Group.findById(parsedChatID);

      // Check if the group exists and if the members Set includes the memberIdToCheck
      if (
        group &&
        group.members.includes(parsedSenderID || group.owner === parsedSenderID)
      ) {
        console.log("<==========REACHED=========>");

        pusherServer.trigger(chatID, "incoming-message", message);

        await sendMessage({ chatID, message });

        return NextResponse.json({ success: true }); // The ID exists in the members Set
      }

      return NextResponse.json({ error: { message: "Access Denied" } }); // The ID does not exist in the members Set or the group doesn't exist
    }

    if (roomType === "p2p") {
      // Find the chat by its ID
      const chat = await Chat.findById(parsedChatID);

      // Check if the chat exists and if the members Set includes the memberIdToCheck
      if (chat && chat.members.includes(parsedSenderID)) {
        pusherServer.trigger(chatID, "incoming-message", message);

        await sendMessage({ chatID, message });

        return NextResponse.json({ success: true }); // The ID exists in the members Set
      }

      return NextResponse.json({ error: { message: "Access Denied" } }); // The ID does not exist in the members Set or the chat doesn't exist
    }
    return NextResponse.json({ error: { message: "Access Denied" } });
  } catch (err) {
    console.log("ERROR =>",err)
    const error = err as Error;
    return NextResponse.json(error);
  }
}


export async function GET(request:NextRequest,{params:{chatID}}:GetProps){

  console.log("CHAT_ID", chatID)

const result = await getMessages({ chatID });

if(!result) return {error:{message:"Could not get messages for this chat"}}

const messages = result.messages

if(!messages) return {error:{message:"Could not get messages for this chat"}}


console.log("API_MESAGES",messages)

return NextResponse.json({messages})

}
