"use client";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import LinksFillIcon from "remixicon-react/LinksFillIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import SpyLineIcon from "remixicon-react/SpyLineIcon";
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
import {
  BoltIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";

import { AnimateInOut } from "./components/client";
import WalletLineIcon from "remixicon-react/WalletLineIcon";
import CurrencyFillIcon from "remixicon-react/CurrencyFillIcon";
import CurrencyLineIcon from "remixicon-react/CurrencyLineIcon";
import BankLineIcon from "remixicon-react/BankLineIcon";
import WifiLineIcon from "remixicon-react/WifiLineIcon";
import CalendarEventLineIcon from "remixicon-react/CalendarEventLineIcon";
import GamepadFillIcon from "remixicon-react/GamepadFillIcon";
import GamepadLineIcon from "remixicon-react/GamepadLineIcon";
import ExchangeDollarLineIcon from "remixicon-react/ExchangeDollarLineIcon";
import Message3FillIcon from "remixicon-react/Message3FillIcon";
import Message3LineIcon from "remixicon-react/Message3LineIcon";
import ArrowDownFillIcon from "remixicon-react/ArrowDownFillIcon";
import SimCard2LineIcon from "remixicon-react/SimCard2LineIcon";
import SimCard2FillIcon from "remixicon-react/SimCard2FillIcon";
import ArrowUpFillIcon from "remixicon-react/ArrowUpFillIcon";

export default function FeaturesSlide() {
  return (
    <div>
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
        spaceBetween={16}
        breakpoints={{
          400: {
            slidesPerView: 1.6,
          },
          640: {
            slidesPerView: 2,
          },
          // 768: {
          //   slidesPerView: 3,
          // },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<ConnectAnonymouslyIcon />}
            title="Connect Anonymoustly"
            text="Send messages, photos, and voice notes to your heart's content, in real-time, while keeping your identity a well-guarded secret. Whether it's one-on-one conversations or group chats, Chwee ensures that your privacy is paramount."
          />
        </SwiperSlide>
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<TransactSeamlesslyIcon />}
            // title="Transact Seamlessly"
            title="In-Chat Transactions"
            text="Send and receive funds with ease and total anonymity. You can send and request funds that will be deposited directly into your in-app wallet, in-chat, without ever revealing your identity."
          />
        </SwiperSlide>
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<FundWalletIcon />}
            title="Fund Your Wallet"
            text="Top up your wallet conveniently with debit/credit cards or bank accounts, making transactions hassle-free."
          />
        </SwiperSlide>
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<WithdrawToBankAccountIcon />}
            title="Withdraw to Your Bank Account"
            text="Enjoy a seamless withdrawal process, transferring funds directly to your bank account."
          />
        </SwiperSlide>
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<GamesAndEventsIcon />}
            title="Game Events and Giveaways"
            text="Get ready for fun and excitement! Create and participate in game events, raffle draws, and giveaways. Purchase event cards and host event rooms for a chance to win big. The best part? Prizes are credited directly to your wallet, keeping the thrill alive."
          />
        </SwiperSlide>
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<DataPurchaseIcon />}
            title="Data Purchase"
            text="Stay connected effortlessly by purchasing data right within the Chwee app. No need to leave your conversations to stay online."
          />
        </SwiperSlide>
        <SwiperSlide className="mr-6">
          <FeatureCard
            icon={<AirtimeSubscriptionIcon />}
            title="Airtime Subscriptions"
            text="Experience convenience like never before with Airtime subscriptions available on Chwee. Stay connected with your favorite mobile services hassle-free."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function FeatureCard({
  icon,
  text,
  title,
}: {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  text: string | React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl bg-pattern shadow-lg w-80 bg-white p-3 space-y-4 h-80 _min-h-[80] flex flex-col">
      <AnimateInOut
        show={!open}
        animate={{ height: "100%", opacity: 1 }}
        init={{ height: "100%", opacity: 1 }}
        out={{ height: 0, opacity: 0 }}
        // transition={{ duration: 0.5 }}
        className="flex items-center w-full h-full mx-auto justify-center_"
      >
        {icon}
      </AnimateInOut>

      <Accordion
        // className={`${open ? "absolute top-0 left-0" : ""}`}
        open={open}
        icon={
          <ChevronUpIcon
            className={`w-6 h-6 transition-all duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        }
      >
        <AccordionHeader
          className="text-2xl active:transform-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          {title}
        </AccordionHeader>
        <AccordionBody>
          <div className="w-full h-full overflow-auto">
            <p className="text-lg">{text}</p>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

function ConnectAnonymouslyIcon() {
  return (
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <SpyLineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <LinksFillIcon className="absolute top-0 left-0 w-16 h-16 text-primary stroke-white" />
        </div>
      </div>
    </div>
  );
}

function FundWalletIcon() {
  return (
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <WalletLineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <CurrencyLineIcon className="absolute top-0 left-0 w-16 h-16 text-white rotate-45_" />
          <CurrencyFillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary" />
        </div>
      </div>
    </div>
  );
}

function WithdrawToBankAccountIcon() {
  return (
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <BankLineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <ArrowDownFillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary stroke-white" />
        </div>
      </div>
    </div>
  );
}

function DataPurchaseIcon() {
  return (
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <WifiLineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <BoltIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary" />
        </div>
      </div>
    </div>
  );
}

function AirtimeSubscriptionIcon() {
  return (
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <SimCard2LineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <SimCard2LineIcon className="absolute top-0 left-0 w-16 h-16 text-white rotate-45_" />
          <SimCard2FillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary" />
        </div>
      </div>
    </div>
  );
}

function GamesAndEventsIcon() {
  return (
    // <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
    //   <CalendarEventLineIcon className="w-24 h-24 text-primary" />
    //   <div className="absolute translate-x-4">
    //     <div className="relative w-full h-full">
    //       <GamepadFillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary stroke-white" />
    //     </div>
    //   </div>
    // </div>
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <CalendarEventLineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <GamepadLineIcon className="absolute top-0 left-0 w-16 h-16 text-white rotate-45_" />
          <GamepadFillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary" />
        </div>
      </div>
    </div>
  );
}

function TransactSeamlesslyIcon() {
  return (
    // <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
    //   <ExchangeDollarLineIcon className="w-24 h-24 text-primary" />
    //   <div className="absolute translate-x-4">
    //     <div className="relative w-full h-full">
    //       <Message3FillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary stroke-white" />
    //     </div>
    //   </div>
    // </div>
    <div className="relative flex items-center justify-center p-4 rounded-full bg-primary/10">
      <ExchangeDollarLineIcon className="w-24 h-24 text-primary" />
      <div className="absolute translate-x-4">
        <div className="relative w-full h-full">
          <Message3LineIcon className="absolute top-0 left-0 w-16 h-16 text-white rotate-45_" />
          <Message3FillIcon className="absolute top-0 left-0 w-16 h-16 rotate-45_ text-primary" />
        </div>
      </div>
    </div>
  );
}
