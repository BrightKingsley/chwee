"use client"

import { ChatContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import Image from "next/image"

export default function Stats() {
  const [topContributor, setTopContributor] = useState(null);
  const { getMessages } = useContext(ChatContext);

  useEffect(() => {
    (async () => {
      const messages = await getMessages();
      if (!messages) return;
      // const mostFrequent = findMostFrequentInObject(messages, "senderId");
      // if (!mostFrequent) return;
      // const top = await getUser(mostFrequent);
      // if (!top) return;
      // setTopContributor(top);
    })();
  }, []);

  return (
    <>
      {/* {topContributor ? ( */}
      <div className="border w-full h-40 rounded-md p-2 divide-y flex items-center">
        <div className="flex gap-2 items-center">
          <div className="w-24 h-24 rounded-full overflow-clip">
            {/* <Image src={topContributor!.photoURL} fill alt="" /> */}
          </div>
          <div>
            <p>
              {/* {topContributor?.username || (
                // <Skeleton containerClassName="flex-1" />
                ""
              )} */}
              username
            </p>
            {/* <p>{!topContributor ? <Skeleton /> : topContributor?.username}</p> */}
            {/* <p>{topContributor?.tag}</p> */}
            <p>@tag</p>
          </div>
         </div>
      </div>
    </>
  );
}

/*
 <>
      <div className="border w-full h-40 rounded-md p-2 divide-y flex items-center">
        {topContributor ? ( 
        <div className="flex gap-2 items-center">
          {topContributor ? (
            <>
              <div className="w-24 h-24 rounded-full overflow-clip">
                {topContributor ? (
                  <img src={topContributor?.photoURL} alt="" />
                ) : (
                  <Skeleton />
                )}
              </div>
              <div>
                <p>{topContributor.username || <Skeleton />}</p>
                <p>{topContributor.tag || <Skeleton />}</p>
              </div>
            </>
          ) : (
            <Skeleton />
          )}
        </div>
 ) : (
          <Skeleton />
        )} 
      </div>
    </> 
 */
