import { ListTile } from "@/app/components/client";
import { IconButton } from "@/app/components/mui";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";
import { Suspense } from "react";
import { BASE_URL } from "@/constants/routes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { getGroups } from "@/lib/db";
import { ClientGroup } from "@/types/models";
import { stringToObjectId } from "@/lib/utils";
import { JoinGroupTrigger } from "../../components";
import { User } from "@/models";
import InformationLineIcon from "remixicon-react/InformationLineIcon";

export default async function Groups({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: { [key: string]: string | string[] };
}) {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession.user.id)
    return null;
  const parsedUserID = stringToObjectId(serverSession.user.id);
  const userDoc = await User.findById(parsedUserID);
  if (!userDoc) return null;

  console.log({ searchParams, userDoc });

  const groups: ClientGroup[] | null = await getGroups({});

  if (!groups) return <p>user has no available groups</p>;
  serverSession.user.id!;
  return (
    <div className="space-y-2">
      {groups?.length > 0 ? (
        groups.map((group, i) => {
          return (
            <ListTile key={group._id.toString()} index={i}>
              <div className="flex items-center w-full gap-2 p-2 border rounded-md backdrop-blur-sm">
                {searchParams &&
                  searchParams.join === "true" &&
                  searchParams.groupTag === group.tag && (
                    <JoinGroupTrigger
                      groupID={group._id.toString()}
                      groupName={group.name}
                      returnURL={GROUPS}
                      locked={group.hasPassWord}
                    />
                  )}
                <Link
                  href={`${GROUPS}/info/${group.tag}`}
                  className="w-12 h-12 rounded-full overflow-clip shrink-0 bg-primary"
                >
                  <Image src={group.photo} alt="" fill sizes="" priority />
                </Link>
                <Link
                  href={
                    userDoc.groups
                      .map((groupID) => groupID.toString())
                      .includes(group._id.toString())
                      ? `${GROUPS}/${group._id}`
                      : `${GROUPS}?join=true&groupTag=${group.tag}`
                  }
                  className="flex-1 w-full overflow-hidden text-left"
                >
                  <p className="w-full overflow-hidden font-semibold whitespace-nowrap text-ellipsis">
                    {group.name}
                  </p>
                  <p className="whitespace-nowrap  overflow-hidden text-ellipsis  w-[14rem] m-0 p-0">
                    {group.description}
                  </p>
                </Link>
                <IconButton className="rounded-full shrink-0 !p-4">
                  <Link href={`${GROUPS}/info/${group.tag}`}>
                    {<InformationLineIcon className="w-6 h-6" />}
                  </Link>
                </IconButton>
              </div>
            </ListTile>
          );
        })
      ) : (
        <div className="flex items-center justify-center w-full h-full pt-40">
          <h1>You have no available groups</h1>
          <XMarkIcon className="w-6 h-6 fill fill-red-400" />
        </div>
      )}
    </div>
  );
}
