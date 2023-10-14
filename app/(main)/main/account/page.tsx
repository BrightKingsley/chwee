import { Header } from "@/components/shared";
import { Button, ListItem, Card } from "@/components/mui";
import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import { UserIcon } from "@heroicons/react/20/solid";
import { AccountEditForm, SignOutButton } from "./components";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { CONNECT } from "@/constants/routes";
import { EditAccountButton } from "./components/Buttons";
import { getUserByID, getGroupInfo } from "@/lib/db";
import Link from "next/link";
import { use } from "react";
import LockOutlined from "@mui/icons-material/LockOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import { UserGroup, ConnectionCard } from "./components";

const avatars = { groups: [1, 1, 1, 1, 1] };

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
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return <h1>Loading...</h1>;

  const userFromSession = serverSession.user;

  const user = await getUserByID({ userID: userFromSession.id! });

  console.log("ACCOUNT_USER", { user });

  if (!user) return <h1>User Unavailable</h1>;

  const userConnections = user.connections.slice(0, 5);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="shrink-0">
          <Header title="My Account" />
        </div>
        {!serverSession || !userFromSession ? (
          <h1>Loading...</h1>
        ) : (
          <div className="flex-1 h-full px-2 py-4 space-y-6 overflow-y-auto shrink-0">
            <div className="space-y-4">
              <div className="relative mx-auto w-fit">
                <div className="w-32 h-32 border rounded-full overflow-clip">
                  {userFromSession.image ? (
                    <Image src={userFromSession.image} alt="" fill />
                  ) : (
                    <UserIcon className="w-full h-full" />
                  )}
                </div>
                <div className="absolute bottom-0 -right-4">
                  <EditAccountButton />
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
                  <p>This userFromSession {"doesn't"} belong to any groups</p>
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
        )}
      </div>
    </>
  );
}

const getGroup = async (groupID: string) => {
  return await getGroupInfo({ groupID });
};

function GroupAvatar({ groupID }: { groupID: string }) {
  const group = use(getGroup(groupID));

  if (!group) return null;

  return (
    <Link href={group.tag} className="rounded-md shrink-0 w-60">
      <Card className="border-[1px]">
        <ListItem className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-full overflow-clip">
            <Image src={group.photo} alt={group.name} fill />
          </div>
          <div>
            <p className="font-bold">{group.name}</p>
            <small className="text-primary">{group.tag}</small>
            <div className="flex items-center gap-1">
              <small>{group.membersCount} members</small>
              <small>
                {group.hasPassword ? (
                  <LockOutlined className="w-3 h-3 text-red-400 fill-red-400" />
                ) : (
                  <LockOpenOutlined className="w-3 h-3 text-green-400 fill-green-400" />
                )}
              </small>
            </div>
          </div>
        </ListItem>
      </Card>
    </Link>
  );
}
