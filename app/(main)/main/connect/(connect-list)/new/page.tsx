import nft from "@/assets/images/nft.jpg";

import { UserIcon } from "@heroicons/react/20/solid";

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
import { User, UserClass } from "@/models";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ConnectButton } from "@/components/shared";
import { findUsers, getUserByID } from "@/lib/db";

// const getUsers = async (session: Session): Promise<UserClass[] | null> => {
//   if (!session.user.id) return null;
//   const res = await fetch(`${BASE_URL}/api/unConnectedUsers`, {
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
  const res = await getUserByID({
    userID: serverSession.user.id,
  });

  const user = res;
  if (!user) return <h1>Error fetching Users</h1>;

  const unConnectedUsers = await User.find({
    _id: { $nin: [...user.connections, user._id] },
  }).exec();

  console.log({ unConnectedUsers });

  if (!unConnectedUsers) return <h1>No unconnected Users</h1>;

  // @ts-ignore

  return unConnectedUsers && unConnectedUsers.length > 0 ? (
    unConnectedUsers.map((user, i) => (
      <ListTile
        key={i}
        slide
        trailing={[<ConnectButton key={i} receiverID={user._id.toString()} />]}
        index={i}
        className="w-full gap-2 pr-2 bg-white rounded-xl md:col-span-1"
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
  ) : unConnectedUsers?.error ? (
    <div className="flex items-center justify-center w-full h-full ">
      <h1>Error fetching Users</h1>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <h1>No unConnectedUsers available</h1>
    </div>
  );
}

// export function AllMembers({ unConnectedUsers }: { unConnectedUsers: any[] }) {
//   // const navigate = useNavigate();

//   const navigateToMemberInfo = (uid: string) => {
//     // navigate(`${MEMBER_INFO}/${uid}`, { state: { source: MEMBERS } });
//   };

//   return (
//     <>
//       {unConnectedUsers.length > 0 ? (
//         unConnectedUsers?.map(({ photo, tag, username, uid }, i) => (
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

// export function Suspended({ unConnectedUsers }: { unConnectedUsers: any[] }) {
//   return (
//     <>
//       <div className="flex items-center justify-center w-full h-full">
//         <p>No suspended Members</p>
//       </div>
//     </>
//   );
// }
