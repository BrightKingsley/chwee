"use client";
import { Button, IconButton } from "@/app/components/mui";
import { Ref, useRef, useState } from "react";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import { AnimateInOut } from "./components/client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  //   const navRef = useRef<HTMLDivElement>();

  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <>
      <AnimateInOut
        init={{ scale: 0 }}
        out={{ scale: 0 }}
        animate={{ scale: 1 }}
        show={!inView}
        className="fixed top-3 right-3 w-fit h-fit z-[100] rounded-full overflow-clip"
      >
        <div className="relative bg-white before:absolute before:top-0 before:left-0 before:z-[101] before:w-full before:h-full before:bg-primary/10  w-full h-full">
          <IconButton
            title="toggle menu"
            aria-label="toggle menu"
            variant="text"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={`flex items-center justify-center rounded-full text-primary fill-primary z-[102]`}
          >
            {/* <Bars3Icon className="w-8 h-8 fill-primary" /> */}
            {open ? (
              <XMarkIcon className="text-primary fill-primary w-8 h-8" />
            ) : (
              <MenuLineIcon className="text-primary fill-primary w-8 h-8" />
            )}
          </IconButton>
        </div>
      </AnimateInOut>
      <div
        ref={ref}
        className="flex relative w-fit items-center justify-center"
      >
        <IconButton
          title="toggle menu"
          aria-label="toggle menu"
          variant="text"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className={`flex items-center justify-center rounded-full md:hidden`}
        >
          {/* <Bars3Icon className="w-8 h-8 fill-primary" /> */}
          {open ? (
            <XMarkIcon className="text-primary fill-primary" />
          ) : (
            <MenuLineIcon />
          )}
        </IconButton>
        {!inView && (
          <div
            className={`flex items-center transition-all bg-white duration-200 gap-3 fixed ${
              open
                ? "rounded-none h-screen w-screen z-[99] top-0 right-0"
                : "rounded-full w-0 h-0"
            }`}
          >
            <ul
              className={` transition-all duration-200 text-3xl font-bold leading-loose text-center ${
                open ? "block m-auto w-fit" : "hidden"
              }`}
            >
              <Link href="#hero">
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="hover:text-primary transition-all duration-150 hover:shadow-md cursor-pointer active:scale-105 px-2"
                >
                  Home
                </li>
              </Link>
              <Link href="#what-is-chwee">
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="hover:text-primary transition-all duration-150 hover:shadow-md cursor-pointer active:scale-105 px-2"
                >
                  What is Chwee?
                </li>
              </Link>
              <Link href="#features">
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="hover:text-primary transition-all duration-150 hover:shadow-md cursor-pointer active:scale-105 px-2"
                >
                  Features
                </li>
              </Link>
              <Link href="#testimonials">
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="hover:text-primary transition-all duration-150 hover:shadow-md cursor-pointer active:scale-105 px-2"
                >
                  Testimonials
                </li>
              </Link>
            </ul>
          </div>
        )}{" "}
        {/* </AnimateInOut> */}
        <ul className="items-center hidden gap-3 md:flex">
          <Link href="#hero">
            <li className="hover:text-primary transition-all duration-150 cursor-pointer active:scale-105 px-2">
              Home
            </li>
          </Link>
          <Link href="#what-is-chwee">
            <li className="hover:text-primary transition-all duration-150 cursor-pointer active:scale-105 px-2">
              What is Chwee?
            </li>
          </Link>
          <Link href="#features">
            <li className="hover:text-primary transition-all duration-150 cursor-pointer active:scale-105 px-2">
              Features
            </li>
          </Link>
          <Link href="#testimonials">
            <li className="hover:text-primary transition-all duration-150 cursor-pointer active:scale-105 px-2">
              Testimonials
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
