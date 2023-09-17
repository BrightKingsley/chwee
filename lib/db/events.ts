import { Event } from "@/models";
import connectDB from "./connect-db";
import { stringToObjectId } from "../utils";
import { EventClass } from "@/models/Event";

export async function createEvent({
  ownerID,
}: {
  ownerID: string;
}): Promise<EventClass> {
  console.log("CREA>TED_WALLET_OWNER", ownerID);
  try {
    await connectDB();

    const parsedID = stringToObjectId(ownerID);

    const event = await Event.create({ owner: parsedID });
    return event;
  } catch (error: any) {
    return error;
  }
}

export async function getEvent({ ownerID }: { ownerID: string }) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(ownerID);

    if (!parsedID) {
      return { error: "Event not Found" };
    }

    const event = await Event.findOne({ owner: parsedID });

    if (!event) return { error: "Event not found" };

    return event;
  } catch (error) {
    return error;
  }
}

export async function deleteEvent({ eventID }: { eventID: string }) {
  try {
    await connectDB();

    const parsedID = stringToObjectId(eventID);

    await Event.findByIdAndDelete(parsedID);
    return true;
  } catch (error) {
    return false;
  }
}

interface EventFilter {
  page?: number;
  limit?: number;
}

export async function getEvents(filter: EventFilter = {}) {
  try {
    await connectDB();
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const events = await Event.find().skip(skip).limit(limit).lean().exec();

    console.log("WALLETS:", events);

    return { events };
  } catch (error) {
    return error;
  }
}
