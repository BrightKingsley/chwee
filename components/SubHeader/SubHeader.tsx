"use client";

import React from "react";
import NavLink from "../NavLink";
import { SubHeaderType } from "./types";

export default function SubHeader({ sublinks }: SubHeaderType) {
  return (
    <div className="flex items-center mb-1 text-gray-500 divide-x bg-primary/10">
      {sublinks.map(({ link, label }) => (
        <NavLink
          key={link + label}
          href={link}
          className="flex-1 px-1 py-2 text-center bg-white rounded-sm sub-nav"
        >
          {({ isActive }) => (
            <div
              className={`sub-nav flex_ mx-auto items-center rounded-lg cursor-pointer group navItem px-[2px] ${
                isActive ? "active" : ""
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
