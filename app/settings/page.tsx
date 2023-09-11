"use client"

import React, { useContext } from "react";
import { Header,NavLink , SubHeader } from "@/components";
import { POLLS, STATS } from "@/constants/routes";
import { ThemeContext } from "@/context";
import { signOut } from "next-auth/react";


export default function ChatSettings() {
  // const { color, setColor } = useContext(ThemeContext);

  return (
    <div>
      <Header title="Chat Settings" />
      <div className="p-4">
        <div className="flex items-center gap-2">
          <p>Change Color Theme</p>
          {/* <label
            htmlFor="set-color"
            style={{ backgroundColor: color }}
            className={`w-20 h-8 rounded-lg`}
          ></label>
          <input
            hidden
            value={color}
            type="color"
            id="set-color"
            onChange={(e) => setColor(e.target.value)}
            className="w-32 rounded-full "
          /> */}
        </div>
        <p className="mt-40">
          IDK what else to do here so ill just drop an Image{" "}
        </p>
      </div>
      <>
        {/* Signed in as {session ?? session?.user?.email} <br /> */}

        <button onClick={() => signOut()}>Sign out</button>
      </>
    </div>
  );
}
