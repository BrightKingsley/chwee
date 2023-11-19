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
import { getGroupByTag, getUserByID } from "@/lib/db";
// icons
import { UserIcon } from "@heroicons/react/20/solid";
import GroupLineIcon from "remixicon-react/GroupLineIcon";
import { JoinGroupTrigger, LeaveGroupTrigger } from "../../../../components";

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
  console.log({ group, decodedTag });
  if (!group)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 space-y-4 text-center h-fit">
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

  if (!userFromSession || !userFromSession.id)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 space-y-4 text-center h-fit">
          <p className="text-3xl font-bold text-primary">
            {"Couldn't"} retrieve User
          </p>

          {/* TODO: check if this is needed */}
          {/* <GroupNotFoundActions /> */}
        </div>
      </div>
    );

  const userDoc = await getUserByID({ userID: userFromSession.id });
  if (!userDoc)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 space-y-4 text-center h-fit">
          <p className="text-3xl font-bold text-primary">
            {"Couldn't"} retrieve User
          </p>

          {/* TODO: check if this is needed */}
          {/* <GroupNotFoundActions /> */}
        </div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col h-screen pt-14">
        <div className="flex-1 h-full px-2 py-4 space-y-6 overflow-y-auto shrink-0">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto border rounded-full overflow-clip bg-primary">
              {group.photo ? (
                <Image src={group.photo} alt="" fill />
              ) : (
                <GroupLineIcon className="text-2xl" />
              )}
            </div>
            <div className="mx-auto text-center w-fit">
              <p className="text-3xl break-all font-druk-wide-bold">
                {group.name}
              </p>
              <p className="break-all tetx-2xl">{group.tag}</p>
              <p className="mt-6 break-all tetx-xl">{group.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mx-auto w-full_ w-fit">
            <p className="font-bold">Members</p>
            <p className="ml-auto">{group.members.length}</p>
          </div>
          <div className="w-full px-12 mt-[80px]">
            {!userDoc.groups
              .map((group) => group.toString())
              .includes(group.id) ? (
              <Link href={`${GROUPS}/info/${group.tag}?join=true`}>
                <Button className="rounded-md font-druk-wide-bold" fullWidth>
                  Join Group
                </Button>
              </Link>
            ) : userDoc.groups
                .map((group) => group.toString())
                .includes(group.id) ? (
              <Link href={`${GROUPS}/${group.id}`}>
                <Button className="rounded-md font-druk-wide-bold" fullWidth>
                  Enter Chat
                </Button>
              </Link>
            ) : userDoc.groupsRequested &&
              !userDoc.groupsRequested
                .map((group) => group.toString())
                .includes(group.id) ? (
              <Link href={`${GROUPS}/info/${group.tag}?cancel=true`}>
                <Button className="rounded-md font-druk-wide-bold" fullWidth>
                  Cancel Request
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      {searchParams && searchParams.join === "true" ? (
        <JoinGroupTrigger
          groupID={group.id}
          groupName={group.name}
          returnURL={`${GROUPS}/info/${group.tag}`}
          locked={group.hasPassword}
        />
      ) : searchParams && searchParams.leave === "true" ? (
        <LeaveGroupTrigger
          groupID={group.id}
          groupName={group.name}
          returnURL={`${GROUPS}`}
          userID={userFromSession.id}
        />
      ) : searchParams && searchParams.cancel === "true" ? (
        <JoinGroupTrigger
          groupID={group.id}
          groupName={group.name}
          returnURL={`${GROUPS}/info/${group.tag}`}
          locked={group.hasPassword}
        />
      ) : null}
    </>
  );
}

/*  
TODO
Check if user is a member of group (user list of groups contains groupId) and change JoiN Group to Visit group, which links to the group chat

Check If user has set a request (user list of groupRequests contains groupID) and chamge Joun Group to Cancel Request.

These conditions should also affect the rendering of <JoinGroupTrigger/>
 */
