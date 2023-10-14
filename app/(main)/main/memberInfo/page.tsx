"use client";

import { useEffect, useState } from "react";
import { HeaderWithoutNav, Spinner } from "@/components/shared";
import Image from "next/image";

export default function MemberInfo() {
  const [member, setMember] = useState(null);

  // const { id } = useParams();

  // useEffect(() => {
  //   if (!id) return;

  //   (async () => {
  //     const user = await getUserByID(id);
  //     if (!user) return;
  //     setMember(user);
  //   })();
  // }, []);

  return (
    <div className="flex flex-col h-screen">
      <HeaderWithoutNav title="Member" />
      <div className="h-full py-4">
        {member ? (
          <>
            <div>
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-clip">
                {/* <Image src={member.photo} fill alt="" /> */}
                {/* <div className="z-10 text-xl absolute_ bottom-0_">
            <BiAlarmOff />
          </div> */}
              </div>
              <div className="mx-auto text-center w-fit">
                {/* <p className="text-3xl font-bold">{member.username}</p>
                <p className="tetx-2xl">{member.tag}</p> */}
              </div>
            </div>
            <div className="px-2 space-y-2">
              <small className="font-bold">account actions</small>
              <div>
                <button className="w-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 ">
                  Gift Airtime / Data
                </button>
              </div>
              <div>
                <button className="w-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 ">
                  Send Funds
                </button>
              </div>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

//https://lh3.googleusercontent.com/ogw/AGvuzYbtEVLoOwSCkHHrzmyPpnD49OxKWeJRR0LBr9rRuA=s32-c-mo
//thisissenderid
//myAnonymous
//$anon
