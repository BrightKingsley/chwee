import nft from "@/assets/images/nft.jpg";

import {
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

import {
  Header,
  ListTile,
  SearchBar,
  Spinner,
  SubHeader,
} from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL, CONNECT, USER_PROFILE } from "@/constants/routes";
import { UserClass } from "@/models";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { ConnectButton } from "./components";
import { findUsers } from "@/lib/db";

// const getUsers = async (session: Session): Promise<UserClass[] | null> => {
//   if (!session.user.id) return null;
//   const res = await fetch(`${BASE_URL}/api/users`, {
//     headers: {
//       user_id: session.user.id,
//     },
//   });

//   const data = await res.json();
//   console.log("USERS_DATA", data);
//   return data;
// };

export default async function Connect() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession || !serverSession.user || !serverSession?.user.id)
    return null;
  const res = await findUsers({
    userID: serverSession.user.id,
  });

  const users = res;

  // @ts-ignore
  if (users.error) return <h1>Error fetching Users</h1>;

  return (
    <div className="flex flex-col h-screen overflow-auto bg-primary/10">
      {/* TODO fix this. Its disorganized */}
      <div>
        <Header title="Connect" />
      </div>
      <div className="space-y-4">
        <SearchBar disabled={!users || users.length < 1} colection="users" />
        <div className="px-2 space-y-2">
          {users && users.length > 0 ? (
            users.map((user, i) => (
              <ListTile
                key={Math.random()}
                slide
                trailing={[
                  <ConnectButton
                    key={Math.random()}
                    receiverID={user._id.toString()}
                  />,
                ]}
                index={i}
                className="w-full gap-2 pr-2 bg-white rounded-xl"
              >
                <Link
                  href={`${CONNECT}/${user.tag}`}
                  className="flex items-center flex-1 gap-2 py-3 pl-2 w-full_ "
                >
                  <div className="flex items-center justify-center w-10 h-10 text-gray-200 rounded-full overflow-clip shrink-0 bg-primary">
                    {user.photo ? (
                      <Image src={user.photo} alt="" fill />
                    ) : (
                      <UserIcon className="w-8 h-8" />
                    )}
                  </div>
                  <div className="w-full text-left ">
                    <p className="font-bold">{user.username}</p>
                    <p className="text-sm text-gray-600 overflow-ellipsis overflow-hidden max-w-[10rem]">
                      {user.tag}
                    </p>
                  </div>
                </Link>
              </ListTile>
            )) // @ts-ignore TODO
          ) : users?.error ? (
            <div className="flex items-center justify-center w-full h-full ">
              <h1>Error fetching Users</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h1>No users available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// export function AllMembers({ users }: { users: any[] }) {
//   // const navigate = useNavigate();

//   const navigateToMemberInfo = (uid: string) => {
//     // navigate(`${MEMBER_INFO}/${uid}`, { state: { source: MEMBERS } });
//   };

//   return (
//     <>
//       {users.length > 0 ? (
//         users?.map(({ photo, tag, username, uid }, i) => (
//           <ListTile
//             key={Math.random()}
//             index={i}
//             onClick={() => navigateToMemberInfo(uid)}
//             className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
//           >
//             <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
//               <Image src={photo} fill alt="" />
//             </div>
//             <div className="w-full text-left ">
//               <p className="font-semibold">{username}</p>

//               {/* TODO COMEBACK check how to use three dots to indicate overflowing text */}
//               <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
//                 {tag}
//               </p>
//             </div>
//           </ListTile>
//         ))
//       ) : (
//         <Spinner />
//       )}
//     </>
//   );
// }

// export function Suspended({ users }: { users: any[] }) {
//   return (
//     <>
//       <div className="flex items-center justify-center w-full h-full">
//         <p>No suspended Members</p>
//       </div>
//     </>
//   );
// }
