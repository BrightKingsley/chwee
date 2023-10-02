import { ConnectionCard, GroupAvatar, Header } from "@/components/shared";
import { ListItem } from "@/components/mui";
import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import { UserIcon } from "@heroicons/react/20/solid";
import { AccountEditForm, SignOutButton } from "./components";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/constants/routes";
import { EditAccountButton } from "./components/Buttons";

const cards = { connections: [1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1] };

const avatars = { groups: [1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1] };

export default async function Account({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: { [key: string]: string | string[] };
}) {
  const data = await getServerSession(authOptions);

  console.log("ACC_PARAMS: ", searchParams);

  const serverSession: Session | null = data;
  if (!serverSession) return <h1>Loading...</h1>;

  const { user } = serverSession;

  console.log("MYACCOUNT_SERVER_SESSION", serverSession);

  const userConnections = cards.connections.slice(0, 5);

  return (
    <>
      <div className="">
        <Header title="My Account" />
        {!serverSession || !user ? (
          <h1>Loading...</h1>
        ) : (
          <div className="h-full px-2 py-4 space-y-6">
            <div className="space-y-4">
              <div className="relative w-fit mx-auto">
                <div className="w-32 h-32 rounded-full overflow-clip border">
                  {user.image ? (
                    <Image src={user.image} alt="" fill />
                  ) : (
                    <UserIcon className="w-full h-full" />
                  )}
                </div>
                <div className="absolute bottom-0 -right-4">
                  <EditAccountButton />
                </div>
              </div>
              <div className="mx-auto text-center w-fit">
                <p className="text-3xl font-druk-wide-bold">{user.name}</p>
                <p className="tetx-2xl">{user.tag}</p>
              </div>
            </div>
            <div>
              <p className="font-bold">Connections</p>
              <div className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 grid-rows-2 lg:grid-rows-1 gap-1 px-2">
                {userConnections.map((connect) => (
                  <ConnectionCard key={connect} userTag={connect.toString()} />
                ))}
                <ListItem className="!p-0 col-span-1 row-span-1 border-[1px]">
                  <div className="w-full h-full flex items-center justify-center">
                    +{cards.connections.slice(5, -1).length}
                  </div>
                </ListItem>
              </div>
            </div>
            <div>
              <p className="font-bold">Groups</p>
              <div className="flex items-center w-full_ overflow-auto p-2 pt-0 gap-2">
                {avatars.groups.length > 0 ? (
                  avatars.groups.map((group, i) => (
                    <GroupAvatar key={i} groupID={group.toString()} />
                  ))
                ) : (
                  <p>This user {"doesn't"} belong to any groups</p>
                )}
              </div>
            </div>
            <div className="mx-2 mt-[80px]">
              <SignOutButton />
            </div>
            <AccountEditForm
              show={searchParams ? searchParams.edit === "true" : false}
            />
          </div>
        )}
      </div>
    </>
  );
}
