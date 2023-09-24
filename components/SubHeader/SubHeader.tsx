"use client";

import React from "react";
import NavLink from "../NavLink";
import { SubHeaderType } from "./types";

export default function SubHeader({ sublinks }: SubHeaderType) {
  return (
    <div className="flex items-center mb-1 text-gray-500 divide-x bg-primary/10 w-full overflow-auto whitespace-nowrap">
      {sublinks.map(({ link, label }) => (
        <NavLink
          key={link + label}
          href={link}
          className="flex-1 px-1 py-2 text-center bg-white rounded-sm sub-nav hover:font-bold hover:text-gray-700 transition-all duration-150 min-w-[8rem]"
        >
          {({ isActive }) => (
            <div
              className={`sub-nav flex_ mx-auto items-center rounded-lg cursor-pointer group navItem px-[2px] ${
                isActive ? "active font-bold text-gray-700" : ""
              }`}
            >
              {label}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
