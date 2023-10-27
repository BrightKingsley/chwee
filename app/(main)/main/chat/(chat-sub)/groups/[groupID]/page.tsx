// @ts-nocheck

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGroupByID, getMessages } from "@/lib/db";
import { Header } from "@/app/components/client";
import GroupChat from "./GroupChat";
import Image from "next/image";
import { GroupNotFoundActions, GroupOptions } from "../../../components";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";

export default async function Group({
  params,
}: {
  params: { groupID: string };
}) {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return <h1>NO USER</h1>;
  const userID = serverSession.user.id;

  const group = await getGroupByID({ groupID: params.groupID });
  console.log("FROM GROUPCHAT PAGE", { group, groupID: params.groupID });
  if (!group)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="space-y-4 text-center h-fit px-4">
          <p className="text-3xl font-bold text-primary">
            {"Couldn't"} retrieve Group
          </p>
          <p>
            The requested group may have either been deleted or you {"don't"}{" "}
            have the authorizatiion to access this group.
          </p>
          {/* TODO: check if this is needed */}
          {/* <GroupNotFoundActions /> */}
        </div>
      </div>
    );

  // TODO try fetching messages here instead of a useEffect in the messages component
  // _ _ _ _ did, did'nt work

  return (
    <>
      {/* <main className="flex flex-col w-full h-screen bg-primary/10"> */}
      <Header
        title={group.name}
        imgShown
        leading={[
          <Link href={`${GROUPS}/${params.groupID}/info`} key={Math.random()}>
            <Image
              src={group.photo}
              width={150}
              height={150}
              className="w-8 h-8 rounded-full bg-primary"
              alt="group photo"
            />
          </Link>,
        ]}
        trailing={[
          <GroupOptions
            key={Math.random()}
            userID={userID}
            groupID={params.groupID}
            groupName={group.name}
            ownerID={group.owner}
          />,
        ]}
      />
      <GroupChat params={params} userID={userID} />
      {/* </main> */}
    </>
  );
}
