"use client";

import Media from "react-media";
import Lottie, { useLottie, LottieOptions } from "lottie-react";
import resize_animation from "@/animation/resize-2.json";

export default function ScreenWidth({
  children,
}: {
  children: React.ReactNode;
}) {
  const animationOptions: LottieOptions = {
    animationData: resize_animation,
    loop: true,
    reversed: true,
    color: "red",
  };

  const { View } = useLottie(animationOptions);

  return (
    <Media queries={{ small: { maxWidth: 640 } }}>
      {/* <Media queries={{ small: { maxWidth: 1200 } }}> */}
      {(matches) => {
        return matches.small ? (
          children
        ) : (
          <div className="flex items-center justify-center h-screen text-center">
            <div className="px-10 space-y-2">
              <h1 className="text-3xl font-extrabold capitalize text-primary">
                Screen too Large
              </h1>
              <p>
                The desktop and Tablet view of Chwee is still in development.
                Please switch to a mobile device, or reduce the size of your
                browser window
              </p>
              <div className="mx-auto w-60 h-60">{View}</div>
            </div>
          </div>
        );
      }}
    </Media>
  );
}
