"use client";

import { Header, SlideIn, Spinner, SubHeader } from "@/components";
import { AUTH, MEMBER_INFO } from "@/constants/routes";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

export default function Connect() {
  const [members, setMembers] = useState([]);

  // const { section } = useParams();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     // navigate(AUTH);
  //   }
  // }, []);

  // const allMembersLinkFormatted = formatLink({
  //   string: ALL_MEMBERS,
  //   at: "s/",
  //   get: "last",
  // });

  // const suspendedMembersLinkFormatted = formatLink({
  //   string: SUSPENDED_MEMBERS,
  //   at: "s/",
  //   get: "last",
  // });

  // let page = <></>;

  // switch (section) {
  //   case allMembersLinkFormatted:
  //     page = <AllMembers members={members} />;
  //     break;

  //   case suspendedMembersLinkFormatted:
  //     page = <Suspended members={members} />;
  //     break;

  //   default:
  //     page = <AllMembers members={members} />;
  //     break;
  // }

  return (
    <div className="flex flex-col h-screen bg-primary/10">
      <Header title={`Members`} />
      {/* <SubHeader
        sublinks={[
          {
            label: replaceWith({
              character: "-",
              replacement: " ",
              string: allMembersLinkFormatted,
            }),
            link: ALL_MEMBERS,
          },
          {
            label: replaceWith({
              character: "-",
              replacement: " ",
              string: suspendedMembersLinkFormatted,
            }),
            link: SUSPENDED_MEMBERS,
          },
        ]}
      /> */}

      <div className="h-full mx-2 space-y-2 overflow-y-auto">CONNECT</div>
    </div>
  );
}

// export function AllMembers({ members }: { members: any[] }) {
//   // const navigate = useNavigate();

//   const navigateToMemberInfo = (uid: string) => {
//     // navigate(`${MEMBER_INFO}/${uid}`, { state: { source: MEMBERS } });
//   };

//   return (
//     <>
//       {members.length > 0 ? (
//         members?.map(({ photoURL, tag, username, uid }, i) => (
//           <SlideIn
//             key={Math.random()}
//             index={i}
//             onClick={() => navigateToMemberInfo(uid)}
//             className="flex items-center w-full gap-2 p-2 bg-white rounded-md bg-primary/10_"
//           >
//             <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
//               <Image src={photoURL} fill alt="" />
//             </div>
//             <div className="w-full text-left ">
//               <p className="font-semibold">{username}</p>

//               {/* TODO COMEBACK check how to use three dots to indicate overflowing text */}
//               <p className="whitespace-nowrap text-ellipsis overflow-hidden w-[17rem] m-0 p-0">
//                 {tag}
//               </p>
//             </div>
//           </SlideIn>
//         ))
//       ) : (
//         <Spinner />
//       )}
//     </>
//   );
// }

// export function Suspended({ members }: { members: any[] }) {
//   return (
//     <>
//       <div className="flex items-center justify-center w-full h-full">
//         <p>No suspended Members</p>
//       </div>
//     </>
//   );
// }
