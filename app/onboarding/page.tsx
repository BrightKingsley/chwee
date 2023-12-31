"use client";

import { signIn, useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/app/components/mui";
import { CHATS } from "@/constants/routes";
import Image from "next/image";
import { redirect } from "next/navigation";
// import { useFcmToken } from "@/hooks";

export default function Onboarding() {
  const { data } = useSession();

  const session = data;

  if (session && session.user && session.user.id) return redirect(CHATS);

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signIn("google", { redirect: true, callbackUrl: CHATS });
  };

  return (
    <div className="relative w-screen h-screen overflow-clip">
      <div className="absolute w-64 h-64 rounded-full -top-20 -right-20 bg-pattern bg-brand-lightblue" />

      <div className="rounded-full absolute -bottom-1/2 -left-[20rem] bg-pattern w-[40rem] h-[40rem] md:w-[50rem] md:h-[50rem] bg-brand-yellow" />

      <Swiper
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: false,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop
        navigation
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-[26rem] md:w-[32rem]">
            <Image
              priority
              width={100}
              height={100}
              src="/images/onboarding/finance.svg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-[22rem] md:w-[32rem]">
            <Image
              priority
              width={100}
              height={100}
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
