// components //
import { Header } from "@/app/components/client";
import { UserGroup, ConnectionCard } from "@/app/components/server";
import { Button, ListItem, Card } from "@/app/components/mui";
// nextJS
import Image from "next/image";
import Link from "next/link";
// react
import { use } from "react";
// auth
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// routes
import { CONNECT, GROUPS } from "@/constants/routes";
// functions
import { getGroupByTag } from "@/lib/db";
// icons
import { UserIcon } from "@heroicons/react/20/solid";
import GroupOutlined from "@mui/icons-material/GroupOutlined";
import { JoinGroupTrigger } from "../../../../components";

export default async function GroupInfo({
  params,
  searchParams,
}: {
  params: { groupTag: string };
  searchParams?: { [key: string]: string | string[] };
}) {
  // auth
  const data = await getServerSession(authOptions);
  const serverSession: Session | null = data;
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;

  const decodedTag = decodeURIComponent(params.groupTag);

  // get data
  const userFromSession = serverSession.user;
  const group = await getGroupByTag({ tag: decodedTag });
  if (!group) return <h1>User Unavailable</h1>;

  return (
    <>
      <div className="flex flex-col h-screen pt-14">
        <div className="flex-1 h-full px-2 py-4 space-y-6 overflow-y-auto shrink-0">
          <div className="space-y-4">
            <div className="w-32 mx-auto h-32 border rounded-full overflow-clip">
              {group.photo ? (
                <Image src={group.photo} alt="" fill />
              ) : (
                <GroupOutlined className="text-2xl" />
              )}
            </div>
            <div className="mx-auto text-center w-fit">
              <p className="text-3xl font-druk-wide-bold">{group.name}</p>
              <p className="tetx-2xl">{group.tag}</p>
              <p className="tetx-xl mt-6">{group.description}</p>
            </div>
          </div>
          <div className="flex w-full_ gap-4 items-center w-fit mx-auto">
            <p className="font-bold">Members</p>
            <p className="ml-auto">{group.members.length}</p>
          </div>
          <div className="w-full px-12 mt-[80px]">
            <Link href={`${GROUPS}/info/${group.tag}?join=true`}>
              <Button className="rounded-md font-druk-wide-bold" fullWidth>
                Join Group
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {searchParams && searchParams.join === "true" && (
        <JoinGroupTrigger
          groupID={group.id}
          groupName={group.name}
          returnURL={`${GROUPS}/info/${group.tag}`}
          locked={group.hasPassword}
        />
      )}
    </>
  );
}

/*  
TODO
Check if user is a member of group (user list of groups contains groupId) and change JoiN Group to Visit group, which links to the group chat

Check If user has set a request (user list of groupRequests contains groupID) and chamge Joun Group to Cancel Request.

These conditions should also affect the rendering of <JoinGroupTrigger/>
 */
