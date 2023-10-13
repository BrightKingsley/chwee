// @ts-nocheck

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGroupByID } from "@/lib/db";
import { Header } from "@/components/shared";
import GroupChat from "./GroupChat";
import Image from "next/image";
import { GroupOptions } from "../../../components";
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

  const group = await getGroupByID({ groupID: params.groupID });
  if (!group) return null;

  // TODO try fetching messages here instead of a useEffect in the messages component

  return (
    <>
      {/* <main className="flex flex-col w-full h-screen bg-primary/10"> */}
      <Header
        title={group.name}
        imgShown
        leading={[
          <Link href={`${GROUPS}/info/${group.tag}`} key={Math.random()}>
            <Image
              src={group.photo}
              width={150}
              height={150}
              className="rounded-full w-8 h-8 bg-primary"
              alt="group photo"
            />
          </Link>,
        ]}
        trailing={[
          <GroupOptions key={Math.random()} groupID={params.groupID} />,
        ]}
      />
      <GroupChat params={params} />
      {/* </main> */}
    </>
  );
}
