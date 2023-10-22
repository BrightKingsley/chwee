"use client";

import { signIn, useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/app/components/mui";
import { CHATS } from "@/constants/routes";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Onboarding() {
  const { data } = useSession();

  const session = data;

  if (session && session.user && session.user.id) return redirect(CHATS);

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signIn("google", { redirect: true, callbackUrl: CHATS });
  };

  return (
    <div className="relative w-screen h-screen">
      <div className="rounded-full absolute -top-20 -right-20 bg-pattern w-64 h-64 bg-brand-lightblue" />

      <div className="rounded-full absolute -bottom-1/2 -left-1/2 bg-pattern w-[40rem] h-[40rem] bg-brand-yellow" />

      <Swiper
        autoplay={{ delay: 3000 }}
        speed={1000}
        loop
        navigation
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="h-80 w-80_">
            <Image
              width={100}
              height={80}
              src="/images/onboarding/finance.svg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="h-60 w-60">
            <Image
              width={80}
              height={80}
              src="/images/onboarding/chat.svg"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <form
        onSubmit={handleSignIn}
        className="absolute z-10 inset-0 mx-auto w-fit top-[80%]"
      >
        <Button
          type="submit"
          variant="outlined"
          className="backdrop-blur-sm bg-white/50 font-druk-wide-bold"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
