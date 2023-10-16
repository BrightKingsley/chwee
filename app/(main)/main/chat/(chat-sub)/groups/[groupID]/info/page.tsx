// components //
import { Header, ListTile } from "@/app/components/client";
import { UserGroup, ConnectionCard } from "@/app/components/server";
import { Button, ListItem, Card } from "@/app/components/mui";
// nextJS
import Image from "next/image";
import Link from "next/link";
// react
import { Suspense, use } from "react";
// auth
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// routes
import { CONNECT } from "@/constants/routes";
// functions
import { getGroupByID, getUserByID } from "@/lib/db";
// icons
import { UserIcon } from "@heroicons/react/20/solid";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import GroupOutlined from "@mui/icons-material/GroupOutlined";
import mongoose from "mongoose";
import { GroupOptions } from "../../../../components";

export default async function GroupInfo({
  params,
  searchParams,
}: {
  params: { groupID: string };
  searchParams?: { [key: string]: string | string[] };
}) {
  // auth
  const data = await getServerSession(authOptions);
  const serverSession: Session | null = data;
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;
  const userID = serverSession.user.id;

  // get data
  const group = await getGroupByID({ groupID: params.groupID });
  if (!group) return <h1>Group Unavailable</h1>;

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header
          title=""
          trailing={[
            <GroupOptions
              groupID={params.groupID}
              userID={userID}
              groupName={group.name}
              key={Math.random()}
              ownerID={group.owner}
            />,
          ]}
        />
        <div className="flex-1 h-full pt-14 px-2 py-4 space-y-6 overflow-y-auto shrink-0">
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
              <p className="tetx-2xl">@{group.tag}</p>
              <p className="tetx-xl mt-6">{group.description}</p>
            </div>
          </div>
          <div className="">
            <p className="font-bold">Members</p>
            <div className="space-y-3">
              {group.members.map((member) => (
                <MemberTile memberID={member} key={member.toString()} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const getMember = async (userID: string | mongoose.Types.ObjectId) => {
  return await getUserByID({ userID });
};

function MemberTile({ memberID }: { memberID: mongoose.Types.ObjectId }) {
  const member = use(getMember(memberID));

  if (!member) return null;

  return (
    <ListTile className="">
      <Link
        href={`${CONNECT}/${member.tag}`}
        className="flex items-center w-full gap-2 p-2 py-1 rounded-md bg-primary/10_"
      >
        <div className="flex items-center justify-center w-10 h-10 text-gray-200 rounded-full overflow-clip shrink-0 bg-deep-orange-40">
          {member.photo !== undefined && member.photo ? (
            <Image
              src={member.photo}
              alt=""
              width={100}
              height={100}
              priority
            />
          ) : (
            <UserIcon className="w-8 h-8" />
          )}
        </div>
        <div className="flex-1 text-left w-full_ ">
          <p className="font-semibold">{member.username}</p>
          <small className="whitespace-nowrap text-ellipsis overflow-hidden w-[14rem] m-0 p-0 text-primary">
            {member.tag}
          </small>
        </div>
      </Link>
    </ListTile>
  );
}

/*  
TODO
Check if user is a member of group (user list of groups contains groupId) and change JoiN Group to Visit group, which links to the group chat

Check If user has set a request (user list of groupRequests contains groupID) and chamge Joun Group to Cancel Request.

These conditions should also affect the rendering of <JoinGroupTrigger/>
 */
