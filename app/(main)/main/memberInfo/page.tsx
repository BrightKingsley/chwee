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
    <div className="h-screen flex flex-col">
      <HeaderWithoutNav title="Member" />
      <div className="h-full py-4">
        {member ? (
          <>
            <div>
              <div className="w-32 h-32 relative rounded-full overflow-clip mx-auto">
                {/* <Image src={member.photo} fill alt="" /> */}
                {/* <div className="absolute_ bottom-0_ text-xl z-10">
            <BiAlarmOff />
          </div> */}
              </div>
              <div className="mx-auto w-fit text-center">
                {/* <p className="font-bold text-3xl">{member.username}</p>
                <p className="tetx-2xl">{member.tag}</p> */}
              </div>
            </div>
            <div className="space-y-2 px-2">
              <small className="font-bold">account actions</small>
              <div>
                <button className="bg-primary/10 p-2 rounded-md w-full active:scale-90 active:shadow-none duration-100 transition-all hover:shadow-md   hover:shadow-primary/20 ">
                  Gift Airtime / Data
                </button>
              </div>
              <div>
                <button className="bg-primary/10 p-2 rounded-md w-full active:scale-90 active:shadow-none duration-100 transition-all hover:shadow-md   hover:shadow-primary/20 ">
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
