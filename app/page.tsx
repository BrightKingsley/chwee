import { DASHBOARD } from "@/constants/routes";
import {
  Bars3Icon,
  BoltIcon,
  ChatBubbleLeftEllipsisIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  PhoneIcon,
  PlusIcon,
  UserIcon,
  WindowIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const buttonStyles = "bg-primary rounded-full px-3 py-2 text-white font-bold";
const featureCards = [1, 1, 1, 1];

const FeatureCard = ({
  background,
  img,
  text,
}: {
  text: string;
  img: string;
  background:
    | "bg-brand-yellow"
    | "bg-primary"
    | "bg-brand-lightblue"
    | "bg-brand-darkblue";
}) => (
  <div key={Math.random()} className="space-y-4 md:space-y-6">
    <div
      className={`sm:w-52 sm:h-52 rounded-3xl sm:rounded-[3rem] overflow-clip p-8 ${background}`}
    >
      <img src={img} alt="" className="w-full h-full object-cover" />
    </div>
    <p className="font-bold text-center">{text}</p>
  </div>
);

const stackImgs = [1, 1, 1, 1, 1];

const WhyUsItem = ({
  icon,
  mainText,
  subText,
}: {
  icon: React.ReactNode;
  mainText: string;
  subText: string;
}) => (
  <div className="flex gap-6 text-gray-800">
    {icon}
    <div>
      <p className="font-extrabold text-4xl">{mainText}</p>
      <p className="text-sm">{subText}</p>
    </div>
  </div>
);

const ImgStack = ({
  img1,
  children,
}: {
  children?: React.ReactNode;
  img1: string;
}) => (
  <>
    <div className="w-12 h-12 border z-20 border-red-500 absolute rounded-full overflow-clip  top-0 left-0">
      <img src={img1} alt="" className="object-cover" />
    </div>
    <div className="w-full bg-green-400 h-full top-0 z-10 -left-8">
      {children && children}
    </div>
  </>
);

export default function Landing() {
  return (
    <main className="w-screen space-y-6 bg-primary/10">
      <header className="flex w-full px-4 md:px-12">
        <div className="flex gap-1 h-16 items-center">
          <div className="h-8 w-8">
            <img src="/favicon/logo.png" alt="logo" width={5} height={5} />
          </div>
          <p className="text-primary font-extrabold">Chweee</p>
        </div>
        <div className="ml-auto flex md:flex-row-reverse items-center text-sm gap-3 whitespace-nowrap">
          <button className={buttonStyles}>Download</button>
          <button className="md:hidden">
            <Bars3Icon className="fill-primary w-8 h-8" />
          </button>
          <ul className="sm:flex gap-3 items-center hidden">
            <li>Home</li>
            <li>Why us?</li>
            <li>Features</li>
            <li>Chwee web</li>
          </ul>
        </div>
      </header>
      <section className="hero md:flex mx-14 py-16">
        <div className="md:flex-[2] text-center md:text-left space-y-10">
          <h1 className="font-extrabold text-3xl text-gray-800">
            <span className="text-primary">Connect</span> with your circle in a
            fun way
          </h1>

          <p>
            Chwee makes your communication with friends and family more fun.
            Stay connected with them with plentiful features
          </p>

          <div className="flex gap-3 items-center mx-auto md:mx-0 w-fit">
            <Link
              href={DASHBOARD}
              className={`hover:scale-110 active:scale-75 active:opacity-60 transition-all duration-150 ${buttonStyles}`}
            >
              Get the app
            </Link>
            <div className="text-primary flex items-center gap-2">
              <button>
                <ComputerDesktopIcon className="w-6 h-6" />
              </button>
              <button>
                <DevicePhoneMobileIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex-[3] flex items-center justify-center">
          <p>Image goes here</p>
        </div>
      </section>
      <section className="px-4 md:px-8 w-full ">
        <div className="w-full bg-white rounded-lg md:rounded-xl py-6 md:py-10 px-6 md:px-24 space-y-6">
          <h3 className="font-extrabold">Highlight Features</h3>
          <div className="grid gap-x-4 gap-y-6 grid-cols-2 sm:flex items-center justify-between w-full md:px-8">
            {/* {featureCards.map((card) => (
              <FeatureCard img="/images/price-tag-crop.png" text="Fast a" />
            ))} */}
            <FeatureCard
              img="/images/price-tag-crop.png"
              text="Fast and reliable"
              background="bg-brand-yellow"
            />
            <FeatureCard
              img="/images/price-tag-crop.png"
              text="Secure encryption"
              background="bg-primary"
            />
            <FeatureCard
              img="/images/price-tag-crop.png"
              text="Unlimited sharing"
              background="bg-brand-darkblue"
            />
            <FeatureCard
              img="/images/price-tag-crop.png"
              text="Seamless Sync"
              background="bg-brand-lightblue"
            />
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8 w-full ">
        <div className="w-full md:flex items-center bg-white rounded-lg md:rounded-xl py-6 md:pt-16 md:pb-24 px-6 md:px-24 space-y-6 md:gap-40">
          <div className="space-y-6 flex-1">
            <h3 className="font-bold">Why Chwee</h3>
            <h2 className="font-bold text-4xl leading-relaxed">
              Our mission is user convenience
            </h2>
            <p className="">
              Chwee makes your communication with friends and family more fun.
              Stay connected with them with plentiful features.
            </p>
          </div>
          <div className="grid grid-cols-2 flex-1 gap-x-4 gap-y-8">
            <WhyUsItem
              icon={<ChatBubbleLeftEllipsisIcon className="w-8 h-8" />}
              mainText="2B+"
              subText="Messages Sent"
            />
            <WhyUsItem
              icon={<UserIcon className="w-8 h-8" />}
              mainText="500M"
              subText="Active Users"
            />
            <WhyUsItem
              icon={<GlobeAltIcon className="w-8 h-8" />}
              mainText="150+"
              subText="Available Countries"
            />
            <WhyUsItem
              icon={<BoltIcon className="w-8 h-8" />}
              mainText="10x"
              subText="Send and Upload Speed"
            />
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8 md:flex space-y-6 md:space-y-0 items-stretch gap-6">
        <div className="font-extrabold text-2xl bg-white flex-[3] px-12 py-12 md:px-24 md:py-14 rounded-xl leading-relaxed">
          Chwee guarantees comfort and safety because we understand how
          important <span className="text-primary">privacy</span> is.
        </div>
        <div className="text-extrabold bg-white flex-[4] px-12 py-8 md:px-16 md:py-14 rounded-xl text-center flex items-center justify-center">
          <div className="space-y-6">
            <p>
              Chwee makes your communication with friends and family more fun.
              Stay connected with them with plentiful features.
            </p>
            <p>
              Chwee makes your communication with friends and family more fun.
              Stay connected with them with plentiful features.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8">
        <div className="py-12 md:px-24 md:py-16 flex justify-between text-4xl font-extrabold text-gray-400 overflow-x-auto">
          <p>LOGO</p>
          <p>LOGO</p>
          <p>LOGO</p>
          <p>LOGO</p>
        </div>
      </section>
      <section className="px-4 md:px-8 md:flex space-y-6 md:space-y-0 gap-6">
        <div className="rounded-2xl space-y-6 flex-1">
          <div className="rounded-2xl bg-primary overflow-clip pl-8 pt-12 h-[40rem] relative">
            <h3 className="text-white ml-10 font-bold">Features</h3>
            <div className=" md:w-96 absolute -right-14 z-10">
              <img src="/images/apartment-listing-mobile.png" alt="" />
            </div>
            <div className="w-64 absolute top-44">
              <img src="/images/apartment-listing-mobile.png" alt="" />
            </div>
          </div>
          <div className="rounded-2xl bg-white px-8 py-7 md:py-14 md:px-16 space-y-14">
            <div className="rounded-2xl bg-white p-4 space-y-3 shadow-2xl shadow-gray-800/30">
              <div className="flex items-center gap-2">
                <img
                  src="/images/user.jpg"
                  alt="preview"
                  className="w-16 h-16 rounded-full"
                />
                <div className="leading-3">
                  <p className="text-sm">Faza Dzikruilo</p>
                  <small className="text-primary text-xs">Typing...</small>
                </div>
                <div className="ml-auto">
                  <small>14:30</small>
                  <div className="p-1 mx-auto rounded-full bg-primary w-6 h-6 text-white text-sm flex items-center justify-center shadow-xl shadow-primary/50">
                    <small className="">2</small>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/images/user.jpg"
                  alt="preview"
                  className="w-12 h-12 rounded-full"
                />
                <div className="leading-3">
                  <p className="text-sm">Faza Dzikruilo</p>
                  <small className="text-primary text-xs">Typing...</small>
                </div>
                <div className="ml-auto">
                  <small>14:30</small>
                  <div className="p-1 mx-auto rounded-full bg-primary w-6 h-6 text-white text-sm flex items-center justify-center shadow-xl shadow-primary/50">
                    <small className="">2</small>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Chwee makes your communication with friends and family more fun.
              Stay connected with them with plentiful features.
            </p>
          </div>
        </div>
        <div className="space-y-6 flex-1">
          <div className="rounded-2xl bg-white px-10 space-y-8 py-14">
            <div className="flex gap-3 rounded-full mx-auto bg-primary w-fit p-2 shadow-lg text-3xl shadow-primary/20">
              <div className="p-2 bg-white rounded-full w-14 h-14 flex items-center justify-center">
                👍️
              </div>
              <div className="p-2 bg-white rounded-full w-14 h-14 flex items-center justify-center">
                ❤️
              </div>
              <div className="p-2 bg-white rounded-full w-14 h-14 flex items-center justify-center">
                🔥
              </div>
              <div className="p-2 bg-white rounded-full w-14 h-14 flex items-center justify-center">
                <PlusIcon className="fill-primary w-10 h-10" />
              </div>
            </div>
            <p className="font-extrabold text-xl">
              Express yourself more through reactions in chat🔥❤️👍️
            </p>
          </div>

          <div className="rounded-2xl bg-white px-8 md:px-14 pt-4 pb-12 space-y-6">
            <div className="image_here border rounded-lg overflow-clip">
              <img src="/images/apartment-listing.png" alt="" />
            </div>
            <p className="font-bold">
              File sharing with no compression to keep the quality🖼️
            </p>
          </div>
          <div className="rounded-2xl flex flex-col bg-white px-12 py-12">
            <div className="flex-1 flex items-center justify-center bg-yellow-300 w-fit">
              <div className="">
                {stackImgs.map((_, i) => (
                  <div
                    key={Math.random()}
                    style={{ left: `-${1 * i}rem` }}
                    className="w-12 h-12 inline-block top-0 border border-red-400 overflow-clip rounded-full"
                  >
                    <img src="/images/user.jpg" alt="" />
                  </div>
                ))}
              </div>
            </div>
            <p>
              Chwee makes your communication with friends and family more fun.
              Stay connected with them with plentiful features.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

//flex items-center justify-between w-full px-8
