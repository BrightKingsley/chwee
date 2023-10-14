import { ListTile } from "@/components/shared";
import { IconButton } from "@/components/mui";
import Image from "next/image";
import nft from "@/assets/images/nft.jpg";
import Link from "next/link";
import { GROUPS } from "@/constants/routes";
import { Suspense } from "react";
import { BASE_URL } from "@/constants/routes";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  InformationCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { getGroups } from "@/lib/db";
import { ClientGroup } from "@/types/models";
import { stringToObjectId } from "@/lib/utils";
import { JoinGroupTrigger } from "../../components";
import { User } from "@/models";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

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

  if (!groups) return null;
  serverSession.user.id!;
  return (
    <>
      {groups?.length > 0 ? (
        groups.map((group, i) => {
          console.log({
            // __CONTAINS_: group.members
            //   .map((member) => member.toString())
            //   .includes(serverSession.user.id!),
            __CONTAINS_: userDoc.groups
              .map((groupID) => groupID.toString())
              .includes(group._id.toString()),
            userID: serverSession.user.id!,

            group,
          });
          return (
            <ListTile key={group._id.toString()} index={i}>
              <Link
                // href={
                //   group.members
                //     .map((member) => member.toString())
                //     .includes(serverSession.user.id!)
                //     ? `${GROUPS}/${group._id}`
                //     : `${GROUPS}?join=true&groupTag=${group.tag}`
                // }
                href={
                  userDoc.groups
                    .map((groupID) => groupID.toString())
                    .includes(group._id.toString())
                    ? `${GROUPS}/${group._id}`
                    : `${GROUPS}?join=true&groupTag=${group.tag}`
                }
                className="flex items-center w-full gap-2 p-2 rounded-md bg-primary/10_"
              >
                {searchParams &&
                  searchParams.join === "true" &&
                  searchParams.groupTag === group.tag && (
                    <JoinGroupTrigger
                      groupID={group._id.toString()}
                      groupName={group.name}
                    />
                  )}
                <Link
                  href={`${GROUPS}/info/${group.tag}`}
                  className="w-12 h-12 rounded-full overflow-clip shrink-0"
                >
                  <Image src={group.photo} alt="" fill sizes="" priority />
                </Link>
                <div className="flex-1 text-left w-full_ ">
                  <p className="font-semibold">{group.name}</p>
                  <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[14rem] m-0 p-0">
                    {group.description}
                  </p>
                </div>
                <IconButton className="rounded-full !p-4">
                  <Link href={`${GROUPS}/info/${group.tag}`}>
                    {<InfoOutlined className="w-6 h-6" />}
                  </Link>
                </IconButton>
              </Link>
            </ListTile>
          );
        })
      ) : (
        <div className="flex items-center justify-center w-full h-full mt-40">
          <h1>You have no available groups</h1>
          <XMarkIcon className="w-6 h-6 fill fill-red-400" />
        </div>
      )}
    </>
  );
}
