"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import ReactTextareaAutoSize from "react-textarea-autosize";
import { Button } from "@/components";
import { BASE_URL } from "@/constants/routes";

type GroupCreate = {
  description: string;
  name: string;
  owner: string;
  password: boolean;
};

export default function CreateGroup() {
  const { data } = useSession();
  const session: Session | any = data;

  const [groupData, setGroupData] = useState<GroupCreate>({
    description: "",
    name: "",
    owner: session?.user.id,
    password: false,
  });

  useEffect(() => {
    console.log("CHECK_SESSION", session);
    setGroupData((prev) => ({ ...prev, owner: session?.user.id }));
  }, [session]);

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log(groupData);

    const response = await fetch(`${BASE_URL}/api/groups/${groupData.owner}`, {
      method: "POST",
      body: JSON.stringify(groupData),
    });

    const data = await response.json();

    console.log("GROP_POST_DATA", data, response);
  };

  return (
    <div className="">
      <form
        onSubmit={(e: React.SyntheticEvent) => handleCreate(e)}
        className="mx-2 md:mx-14 mt-20 shadow-lg bg-white p-4 rounded-lg space-y-3"
      >
        <div>
          <small>name</small>
          <input
            value={groupData.name}
            type="text"
            onChange={(e) => {
              setGroupData((prev) => ({ ...prev, name: e.target.value }));
            }}
            className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/20"
          />
        </div>
        <div>
          <small>description</small>
          <ReactTextareaAutoSize
            value={groupData.description}
            // cols={5}
            maxRows={6}
            minRows={5}
            onChange={(e) =>
              setGroupData((prev) => ({
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
            checked={groupData.password}
            onChange={(e) => {
              setGroupData((prev) => ({
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
  );
}
