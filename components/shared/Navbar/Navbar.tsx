"use client";

import { useContext, useEffect, useState } from "react";
import nft from "../../assets/images/nft.jpg";
import { motion } from "framer-motion";
import {
  ACCOUNT,
  CHAT,
  EVENTS,
  CONNECT,
  NOTIFICATIONS,
  WALLET,
  DASHBOARD,
} from "@/constants/routes";
import Close from "../Close";

// Hero Icons
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
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";

// Material Icons
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import NavLink from "../NavLink";
import { AnimateInOut } from "..";
import { usePathname } from "next/navigation";
import Media from "react-media";
import { Button, IconButton } from "@material-tailwind/react";

const iconClassNames = "w-6 h-6";

const navLinks = [
  // {
  //   link: DASHBOARD,
  //   icon: <DashboardOutlinedIcon className={iconClassNames} />,
  //   name: "dashboard",
  // },
  {
    link: `${CHAT}/chats`,
    icon: <SmsOutlinedIcon className={iconClassNames} />,
    name: "chat",
  },
  {
    link: WALLET,
    icon: <AccountBalanceWalletOutlined className={iconClassNames} />,
    name: "wallet",
  },
  {
    link: NOTIFICATIONS,
    icon: <NotificationsOutlinedIcon className={iconClassNames} />,
    name: "notifications",
  },
  // {
  //   link: `${EVENTS}/my-events`,
  //   icon: <DateRangeOutlinedIcon className={iconClassNames} />,
  //   name: "events",
  // },
  {
    link: `${CONNECT}/my-connections`,
    icon: <HubOutlinedIcon className={iconClassNames} />,
    name: "connect",
  },
  {
    link: ACCOUNT,
    icon: <AccountCircleOutlinedIcon className={iconClassNames} />,
    name: "account",
  },
];

let screen = false;
export default function Navbar() {
  const [showMenu, setShowMenu] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!screen) return;
    setShowMenu(false);
  }, [pathname]);

  return (
    <>
      {!showMenu && (
        <div className="fixed z-40 md:hidden top-2 left-3 active:!fixed">
          <IconButton
            title="open nav"
            aria-label="open nav"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MenuOutlinedIcon className="w-8 h-8 fill-gray-600" />
          </IconButton>
        </div>
      )}
      <Media queries={{ small: { maxWidth: 640 } }}>
        {(matches) => {
          screen = matches.small && true;
          return (
            <AnimateInOut
              init={{ translateX: "-100%", opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              out={{ translateX: "-100%", opacity: 0 }}
              show={matches.small ? showMenu : true}
              className="flex fixed md:static h-screen flex-col -left-[100px]_ w-[calc(100vw/0.5)]_ w-14 z-40 bg-white border-r-2 font-druk-wide-bold"
            >
              <div>
                <IconButton
                  title="close nav"
                  aria-label="close nav"
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center justify-center mx-auto mt-3 md:hidden"
                >
                  <CloseOutlinedIcon className="w-8 h-8 fill-gray-600" />
                </IconButton>
                {navLinks.map(({ icon, link, name }) => (
                  <div key={Math.random()}>
                    <NavLink href={link} className="nav">
                      {({ isActive }) => (
                        <div
                          className={`${
                            isActive ? "_main-nav_" : ""
                          } flex mx-auto w-12 h-12 my-4 items-center static rounded-lg cursor-pointer group navItem transition-all duration-200 px-[2px]`}
                        >
                          <IconButton
                            aria-label={name}
                            variant="text"
                            className="last:ml-[2px] h-full flex items-center group-active:scale-75 justify-center w-full bg-body transition-all duration-100 !text-gray-600 group-hover:!fill-white group-hover:!text-white group-focus:!fill-white group-focus:!text-white focus:!fill-white focus:!text-white  group-hover:bg-gradient-primary
                            group-active:bg-gradient-primary group-focus:bg-gradient-primary focus:bg-gradient-primary  rounded-md z-10"
                          >
                            {icon}
                          </IconButton>
                          <div className="inline-block left-[110%] absolute py-3 px-2 w-0 group-hover:w-[9.5rem] group-hover:min-w-[9rem] group-focus:w-[9.5rem] group-focus:min-w-[9rem] h-12  group-hover:visible group-focus:visible #group-hover:translate-x-0 invisible #-translate-x-10 transition-all duration-300  bg-body whitespace-nowrap text-gray-600 group-hover:shadow-md group-hover:shadow-primary/30 rounded-md">
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
            </AnimateInOut>
          );
        }}
      </Media>
    </>
  );
}
