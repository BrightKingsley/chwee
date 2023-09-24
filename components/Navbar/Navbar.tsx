"use client";

import { useContext, useState } from "react";
import nft from "../../assets/images/nft.jpg";
import { motion } from "framer-motion";
import {
  ACCOUNT,
  CHAT,
  EVENTS,
  CONNECT,
  NOTIFICATIONS,
  WALLET,
  HOME,
} from "@/constants/routes";
import Close from "../Close";
import {
  ChatBubbleBottomCenterIcon,
  WalletIcon,
  BellIcon,
  CakeIcon,
  UserGroupIcon,
  UserIcon,
  Cog8ToothIcon,
  HomeIcon,
  CalendarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import NavLink from "../NavLink";

const iconClassNames = "w-6 h-6";

const navLinks = [
  {
    link: HOME,
    icon: <HomeIcon className={iconClassNames} />,
    name: "home",
  },
  {
    link: CHAT,
    icon: <ChatBubbleBottomCenterIcon className={iconClassNames} />,
    name: "chat",
  },
  {
    link: WALLET,
    icon: <WalletIcon className={iconClassNames} />,
    name: "wallet",
  },
  {
    link: NOTIFICATIONS,
    icon: <BellIcon className={iconClassNames} />,
    name: "notifications",
  },
  {
    link: EVENTS,
    icon: <CalendarDaysIcon className={iconClassNames} />,
    name: "events",
  },
  {
    link: CONNECT,
    icon: <UserGroupIcon className={iconClassNames} />,
    name: "connect",
  },
  {
    link: ACCOUNT,
    icon: <UserIcon className={iconClassNames} />,
    name: "account",
  },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    //   {/* <button
    //     onClick={() => setShowMenu(true)}
    //     className="text-3xl active:scale-75 active:opacity-50"
    //   >
    //     <Bars3Icon className={iconClassNames}text-gray-700" />
    //   </button> */}

    <motion.div
      // animate={{
      //   translateX: showMenu ? 100 : 0,
      //   opacity: showMenu ? 1 : 0,
      // }}
      className="flex h-screen flex-col -left-[100px]_ w-[calc(100vw/0.5)]_ w-14 z-40 bg-white border-r-2 font-druk-wide-bold"
    >
      {/* <div className="relative flex items-center justify-center w-full h-auto pt-4">
        <Close close={() => setShowMenu(false)} />
      </div> */}
      <div>
        {navLinks.map(({ icon, link, name }) => (
          <div key={Math.random()}>
            <NavLink href={link} className="nav">
              {({ isActive }) => (
                <div
                  className={`${
                    isActive ? "_main-nav_" : ""
                  } flex mx-auto w-12 h-12 my-4 items-center static rounded-lg cursor-pointer group navItem transition-all duration-200 px-[2px]`}
                >
                  <div className="ml-[2px] h-full flex items-center group-active:scale-75 justify-center w-full bg-body transition-all duration-100 text-gray-600 group-hover:text-white group-hover:bg-gradient-primary group-active:bg-gradient-primary rounded-md z-10">
                    {icon}
                  </div>
                  <div className="inline-block left-[110%] absolute py-3 px-2 w-0 group-hover:w-[9.5rem] group-hover:min-w-[9rem] h-12  group-hover:visible #group-hover:translate-x-0 invisible #-translate-x-10 transition-all duration-300  bg-body whitespace-nowrap text-gray-600 group-hover:shadow-md group-hover:shadow-primary/30 rounded-md">
                    <p className="transition-all duration-300 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                      {name}
                    </p>
                  </div>
                </div>
              )}
            </NavLink>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
