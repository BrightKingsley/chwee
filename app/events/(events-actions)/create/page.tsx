"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import ReactTextareaAutoSize from "react-textarea-autosize";
import { Button, Header } from "@/components";
import { BASE_URL } from "@/constants/routes";

type EventCreate = {
  description: string;
  name: string;
  prize: number;
  type: "raffle" | "QnA";
  owner: string;
  password: boolean;
};

export default function CreateEvent() {
  const { data } = useSession();
  const session: Session | any = data;

  const [eventData, setEventData] = useState<EventCreate>({
    description: "",
    name: "",
    prize: 0,
    type: "raffle",
    owner: session?.user.id,
    password: false,
  });

  useEffect(() => {
    console.log("CHECK_SESSION", session);
    setEventData((prev) => ({ ...prev, owner: session?.user.id }));
  }, [session]);

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log(eventData);

    const response = await fetch(`${BASE_URL}/api/events`, {
      method: "POST",
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    console.log("EVENT_POST_DATA", data, response);
  };

  return (
    <>
      <Header title="Create Event" />
      <div className="">
        <form
          onSubmit={(e: React.SyntheticEvent) => handleCreate(e)}
          className="mx-2 md:mx-14 shadow-lg bg-white p-4 rounded-lg space-y-3"
        >
          <div>
            <small>name</small>
            <input
              value={eventData.name}
              type="text"
              onChange={(e) => {
                setEventData((prev) => ({ ...prev, name: e.target.value }));
              }}
              className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/20"
            />
          </div>
          <div>
            <small>type</small>
            <input
              value={eventData.name}
              type="text"
              onChange={(e) => {
                setEventData((prev) => ({ ...prev, type: "raffle" }));
              }}
              className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/20"
            />
          </div>
          <div>
            <small>prize</small>
            <input
              value={eventData.prize}
              type="number"
              onChange={(e) => {
                setEventData((prev) => ({
                  ...prev,
                  prize: parseFloat(e.target.value),
                }));
              }}
              className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/20"
            />
          </div>
          <div>
            <small>description</small>
            <ReactTextareaAutoSize
              value={eventData.description}
              // cols={5}
              maxRows={6}
              minRows={5}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/20"
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Locked</p>
            <input
              type="checkbox"
              checked={eventData.password}
              onChange={(e) => {
                setEventData((prev) => ({
                  ...prev,
                  password: e.target.checked,
                }));
              }}
            />
          </div>

          <div className="rounded-md overflow-clip">
            <Button full>Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
