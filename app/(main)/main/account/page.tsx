// components //
import { Header } from "@/app/components/client";
import { UserGroup, ConnectionCard } from "@/app/components/server";
import { Button, ListItem, Card } from "@/app/components/mui";
import {
  AccountDeleteButton,
  AccountEditForm,
  SignOutButton,
} from "./components";
import { AccountEditButton } from "./components";
// nextJS
import Image from "next/image";
import Link from "next/link";
// react
import { use } from "react";
// auth
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// routes
import { ACCOUNT, CONNECT } from "@/constants/routes";
// functions
import { getUserByID, getGroupByID } from "@/lib/db";
// icons
import { UserIcon } from "@heroicons/react/20/solid";

export default async function Account({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: { [key: string]: string | string[] };
}) {
  // auth
  const data = await getServerSession(authOptions);
  const serverSession: Session | null = data;
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;

  // get data
  const userFromSession = serverSession.user;
  const user = await getUserByID({ userID: userFromSession.id! });
  if (!user)
    return (
      <div className="w-screen h-screen bg-pattern flex items-center justify-center">
        <h1>User Unavailable</h1>
      </div>
    );
  const userConnections = user.connections.slice(0, 5);

  return (
    <>
      <AccountDeleteButton />
      <div className="flex flex-col h-screen bg-pattern">
        <div className="shrink-0">
          <Header title="My Account" />
        </div>
        {
          <div className="flex-1 h-full px-2 py-4 space-y-6 overflow-y-auto shrink-0">
            <div className="space-y-4">
              <div className="relative mx-auto w-fit">
                <Link href={`${ACCOUNT}/display-photo`}>
                  <div className="w-32 h-32 border rounded-full overflow-clip">
                    {userFromSession.image ? (
                      <Image src={userFromSession.image} alt="" fill />
                    ) : (
                      <UserIcon className="w-full h-full" />
                    )}
                  </div>
                </Link>
                <div className="absolute bottom-0 -right-4">
                  <AccountEditButton />
                </div>
              </div>
              <div className="mx-auto text-center w-fit">
                <p className="text-3xl font-druk-wide-bold">
                  {userFromSession.name}
                </p>
                <p className="tetx-2xl">{userFromSession.tag}</p>
              </div>
            </div>
            <div>
              <p className="font-bold">Connections</p>
              {userConnections.length > 0 ? (
                <div className="grid w-full grid-cols-3 gap-1 px-2 grid-rows-2_ sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:grid-rows-1">
                  {userConnections.map((connect) => (
                    <ConnectionCard
                      key={connect.toString()}
                      userID={connect.toString()}
                    />
                  ))}
                  {userConnections.slice(5, -1).length > 0 && (
                    <ListItem className="!p-0 col-span-1 row-span-1 border-[1px]">
                      <div className="flex items-center justify-center w-full h-full">
                        +{userConnections.slice(5, -1).length}
                      </div>
                    </ListItem>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mx-auto w-fit">
                    <p>You have no available connections</p>
                    <Button>
                      <Link href={`${CONNECT}/new`}>
                        Find and Create a connection
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="font-bold">Groups</p>
              <div className="flex items-center gap-2 p-2 pt-0 overflow-auto w-full_">
                {user.groups.length > 0 ? (
                  user.groups.map((group, i) => (
                    <UserGroup key={i} groupID={group.toString()} />
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
              show={searchParams && searchParams.edit === "true" ? true : false}
            />
          </div>
        }
      </div>
    </>
  );
}
