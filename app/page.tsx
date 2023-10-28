import { Button, IconButton } from "@/app/components/mui";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import { CHATS } from "@/constants/routes";
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
import FeaturesSlide from "./FeaturesSlide";
import LandingNav from "./LandingNav";

const buttonStyles = "bg-primary rounded-full px-3 py-2 text-white font-bold";
const featureCards = [1, 1, 1, 1, 1, 1];

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
      className={`relative sm:w-52 sm:h-52 rounded-3xl sm:rounded-[3rem] overflow-clip p-8 ${background}`}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Image width={1080} height={1080} src="/images/pattern.svg" alt="" />
      </div>
      <Image
        src={img}
        alt=""
        width={80}
        height={80}
        className="object-cover w-full h-full"
      />
    </div>
    <p className="text-sm font-bold text-center">{text}</p>
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
      <p className="text-4xl font-extrabold">{mainText}</p>
      <p className="text-sm">{subText}</p>
    </div>
  </div>
);

export default function Landing() {
  return (
    <main className="w-screen space-y-6 bg-emerald-700 bg-primary/10">
      <header className="flex w-full px-4 md:px-12">
        <div className="flex items-center h-16 gap-1">
          <div className="w-8 h-8">
            <Image src="/favicon/logo.png" alt="logo" width={5} height={5} />
          </div>
          <p className="font-extrabold text-primary">Chweee</p>
        </div>
        <div className="flex items-center gap-3 ml-auto text-sm md:flex-row-reverse whitespace-nowrap">
          <Link href={CHATS}>
            <Button className="px-3 py-2 font-bold text-white rounded-full">
              Get Started
            </Button>
          </Link>
          <LandingNav />
        </div>
      </header>
      <section className="py-16 md:flex mx-14" id="hero">
        <div className="md:flex-[2] text-center md:text-left space-y-10">
          <h1 className="text-5xl font-extrabold text-gray-800">
            <span className="text-primary">Connect</span> with your circle in a
            fun way!
          </h1>

          <p>
            Chwee makes user interaction a lot more fun. Stay connected with
            plentiful features
          </p>

          <div className="flex items-center gap-1_ mx-auto md:mx-0 w-fit">
            <Link
              href={CHATS}
              // className={`hover:scale-110 active:scale-75 active:opacity-60 transition-all duration-150 ${buttonStyles}`}
            >
              <Button className="">Get Started!</Button>
            </Link>
            <div className="flex items-center -space-x-2 text-primary">
              {/* <IconButton aria-label="get for desktop" title="get for desktop">
                <ComputerDesktopIcon className="w-6 h-6" />
              </IconButton> */}
              <IconButton aria-label="get for mobile" title="get for mobile">
                <DevicePhoneMobileIcon className="w-6 h-6" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="md:flex-[3] flex items-center justify-center">
          <p>Image goes here</p>
        </div>
      </section>
      <section className="w-full px-4 md:px-8">
        <div className="w-full px-6 py-6 space-y-6 bg-white rounded-lg md:rounded-xl md:py-10 md:px-24">
          <h3 className="font-extrabold">Highlight Features</h3>
          <div className="grid items-center justify-between w-full grid-cols-2 overflow-x-auto rounded-t-3xl md:rounded-[3.5rem] gap-x-4 gap-y-6 sm:flex md:px-8">
            {/* {featureCards.map((card) => (
              <FeatureCard Image="/images/price-tag-crop.png" text="Fast a" />
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
      <section className="w-full px-4 md:px-8" id="what-is-chwee">
        <div className="items-center w-full px-6 py-6 space-y-6 bg-white rounded-lg md:flex md:rounded-xl md:pt-16 md:pb-24 md:px-24 md:gap-40">
          <div className="flex-1 space-y-6">
            <h3 className="font-bold">
              What is <span className="text-primary">Chwee?</span>
            </h3>
            <h2 className="text-4xl font-bold leading-snug md:leading-relaxed">
              Our mission is fluid user interaction
            </h2>
            <p className="">
              Chwee is your gateway to a world of anonymous connection and
              secure transactions. {"It's"} the go-to platform where you can:
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-8">
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
      <section className="items-stretch gap-6 px-4 space-y-6 md:px-8 md:flex md:space-y-0">
        <div className="font-extrabold text-2xl bg-white flex-[3] px-12 py-12 md:px-24 md:py-14 rounded-xl leading-relaxed">
          Chwee guarantees comfort and safety because we understand how
          important <span className="text-primary">privacy</span> is.
        </div>
        <div className="text-extrabold bg-white flex-[4] px-12 py-8 md:px-16 md:py-14 rounded-xl text-center flex items-center justify-center">
          <div className="space-y-6">
            <p>
              Chwee makes user interaction a lot more fun. Stay connected with
              access to plentiful features.
            </p>
            <p>
              Chwee makes user interaction a lot more fun. Stay connected with
              access to plentiful features.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8">
        <div className="flex justify-between py-12 overflow-x-auto text-4xl gap-3 font-extrabold text-gray-400 md:px-24 md:py-16">
          <p>CHWEE</p>
          <p>CHWEE</p>
          <p>CHWEE</p>
          <p>CHWEE</p>
        </div>
      </section>
      <section
        className="items-stretch gap-6 px-4 space-y-6 md:px-8 md:flex md:space-y-0"
        id="features"
      >
        <div className="flex flex-col flex-1 space-y-6 justify-stretch rounded-2xl">
          <div className="rounded-2xl bg-primary overflow-clip pl-8 pt-12 h-[46rem] relative">
            <h3 className="ml-8 font-bold text-white md:ml-10">Features</h3>
            <div className="absolute z-10 mt-6 md:w-96 -right-14">
              <Image
                width={400}
                height={600}
                src="/images/apartment-listing-mobile.png"
                alt=""
              />
            </div>
            <div className="absolute w-64 top-56">
              <Image
                width={400}
                height={600}
                src="/images/apartment-listing-mobile.png"
                alt=""
              />
            </div>
          </div>
          <div className="px-8 bg-white rounded-2xl py-7 md:py-14 md:px-16 space-y-14">
            <div className="p-4 space-y-3 bg-white shadow-2xl rounded-2xl shadow-gray-800/30">
              <div className="flex items-center gap-2">
                <Image
                  width={80}
                  height={80}
                  src="/images/user.jpg"
                  alt="preview"
                  className="w-16 h-16 rounded-full"
                />
                <div className="leading-3">
                  <p className="text-sm font-bold">Faza Dzikruilo</p>
                  <small className="text-xs text-primary">Typing...</small>
                </div>
                <div className="ml-auto">
                  <small>14:30</small>
                  <div className="flex items-center justify-center w-6 h-6 p-1 mx-auto text-sm text-white rounded-full shadow-xl bg-primary shadow-primary/50">
                    <small className="">2</small>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  width={80}
                  height={80}
                  src="/images/user.jpg"
                  alt="preview"
                  className="w-12 h-12 rounded-full"
                />
                <div className="leading-3">
                  <p className="text-sm font-bold">King Bayo</p>
                  <small className="text-xs text-primary">Typing...</small>
                </div>
                <div className="ml-auto">
                  <small>14:30</small>
                  <div className="flex items-center justify-center w-6 h-6 p-1 mx-auto text-sm text-white rounded-full shadow-xl bg-primary shadow-primary/50">
                    <small className="">2</small>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Chwee makes user interaction a lot more fun. Stay connected with
              access to plentiful features.
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 space-y-6">
          <div className="space-y-8 bg-white rounded-2xl py-14 shrink-0">
            <div className="flex gap-3 p-2 mx-auto text-3xl rounded-full shadow-lg bg-primary w-fit shadow-primary/20">
              <div className="flex items-center justify-center p-2 bg-white rounded-full w-14 h-14">
                👍️
              </div>
              <div className="flex items-center justify-center p-2 bg-white rounded-full w-14 h-14">
                ❤️
              </div>
              <div className="flex items-center justify-center p-2 bg-white rounded-full w-14 h-14">
                🔥
              </div>
              <div className="flex items-center justify-center p-2 bg-white rounded-full w-14 h-14">
                <PlusIcon className="w-10 h-10 fill-primary" />
              </div>
            </div>
            <p className="px-10 text-xl font-extrabold">
              Express yourself more through reactions in chat🔥❤️👍️
            </p>
          </div>

          <div className="px-12 pt-4 pb-12 space-y-10 bg-white rounded-2xl md:px-14 shrink-0">
            <div className="relative h-96">
              <div className="border absolute h-[85%] left-10 z-20 rounded-lg image_here overflow-clip shadow-xl shadow-gray-400/20">
                <Image
                  width={860}
                  height={860}
                  src="/images/apartment-listing.png"
                  alt=""
                />
              </div>
              <div className="border absolute z-10 top-4  rounded-lg image_here w-[92%] h-full overflow-clip flex flex-col  p-4 shadow-xl shadow-gray-400/20">
                <div className="w-full_ flex-[5.3] bg-gray-300 h- rounded-lg"></div>
                <div className=" flex-[1] flex items-end">
                  <p className="font-bold">Here it is! hope you like it</p>
                </div>
              </div>
            </div>
            <p className="text-xl font-bold">
              File sharing with no compression to keep the quality🖼️
            </p>
          </div>
          <div className="px-12 py-12 space-y-8 bg-white md:px-20 rounded-2xl flex-1">
            <div className="relative w-fit mx-auto flex items-center -space-x-5">
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip z-40">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip z-30">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip z-20">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip z-10">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              {/* <div className="z-10 shrink-0 flex items-center justify-center text-sm font-bold text-white rounded-full w-14 h-14 bg-primary">
                  99+
                </div> */}
            </div>
            <p className="text-center">
              Chwee makes user interaction a lot more fun. Stay connected with
              access to plentiful features.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8">
        {/* <div className="flex items-center justify-center py-16 bg-white rounded-2xl">
          <h3 className="text-3xl underline text-primary decoration-primary">
            Explore all features
          </h3>
        </div> */}
        <FeaturesSlide />
      </section>
      <section className="px-4 md:px-8" id="testimonials">
        <div className="px-4 py-6 space-y-12 bg-white md:py-10 rounded-xl md:px-14">
          <div className="md:flex">
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold">Testimonials</h3>
              <h2 className="text-3xl font-extrabold ">
                Now is the time for those who say
              </h2>
            </div>
            <div className="relative flex items-center ml-auto bg-white rounded-full w-fit h-fit p-2 -space-x-5 shadow-lg">
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip z-20">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip z-10">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="border shrink-0 rounded-full border-primary w-14 h-14 overflow-clip">
                <Image width={80} height={80} src="/images/user.jpg" alt="" />
              </div>
              <div className="z-10 shrink-0 flex items-center justify-center text-sm font-bold text-white rounded-full w-14 h-14 bg-primary">
                99+
              </div>
            </div>
          </div>
          <div className="grid grid-flow-row-dense gap-4 grid-cols-8 sm:grid-cols-12 grid-rows-[7]  text-white font-bold leading-7 rounded-xl sm:h-[36rem]_">
            <div className="row-span-1 p-6 col-span-full md:col-span-8 rounded-t-xl rounded-l-xl bg-primary">
              Just brilliant. Does everything I need it to do and more
            </div>
            <div className="row-span-4 p-6 col-span-full md:col-span-4 rounded-t-xl rounded-l-xl bg-brand-lightblue">
              Absolutely perfect messaging experience. I have been using
              telegram for many year with friends and family, and i highly
              recommend to any users looking fro 100% free, simple, functional,
              respecting and secure messaging on every platform
            </div>
            <div className="row-span-2 p-6 col-span-full md:col-span-3 rounded-t-xl rounded-l-xl bg-brand-darkblue">
              Chwee is the best messaging app in the world, period.🔥
            </div>
            <div className="row-span-3 p-6 col-span-full md:col-span-5 rounded-t-xl rounded-l-xl bg-brand-yellow">
              Been using this app for years now, and its easily my favourite
              messaging app, period. Consistent updates and improvements,
              amazing animations and it runs smoothly.❤️
            </div>
            <div className="row-span-6 p-6 col-span-full md:col-span-3 rounded-t-xl rounded-l-xl bg-brand-lightblue">
              I {"couldn't"} have survived without it. {"I've"} never lost a
              message, file, picture, and voice notes are crystal clear. The
              organization functions make it superior to all other options. It
              was nice to have a grown up space of normal communication threads.
            </div>
            <div className="row-span-3 p-6 col-span-full md:col-span-9 rounded-t-xl rounded-l-xl bg-brand-darkblue">
              The most interesting feature , your chat, music, video and other
              files are backed up to the cloud and always accessible on any
              device with your email and an email verification.
            </div>
            <div className="row-span-2 p-6 col-span-full md:col-span-5 rounded-t-xl rounded-l-xl bg-primary">
              This is a great app. {"I'm"} making this my main social media for
              everything. {"I'm"} a content creator and I really like the
              format.
            </div>
            <div className="row-span-2 p-6 col-span-full md:col-span-4 rounded-t-xl rounded-l-xl bg-brand-yellow">
              Chwee is seriosly flexible. It just makes your life eaiser. Super
              fast texting features.
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 md:h-screen_">
        <div className="flex flex-col-reverse bg-white md:flex-row md:px-8 md:py-20 rounded-xl py-12">
          {/* <div className="relative flex-1 -top-5">
            <div className="absolute">
              <Image width={100} height={100} src="/images/apartment-listing-mobile.png" alt="" />
            </div>
            <div className="absolute z-10 left-36">
              <Image width={100} height={100} src="/images/apartment-listing-mobile.png" alt="" />
            </div>
            <div className="absolute z-10 left-72">
              <Image width={100} height={100} src="/images/apartment-listing-mobile.png" alt="" />
            </div>
          </div> */}
          <div className="flex-1 space-y-6">
            <h2 className="max-w-lg text-4xl font-extrabold leading-snug text-center md:text-left md:max-w-none md:leading-loose">
              Abundant features are waiting for you, what are you waiting for?
            </h2>
            <div className="flex items-center gap-3 mx-auto md:mx-0_ w-fit">
              <Link href={CHATS}>
                <Button className="px-3 py-2 font-bold text-white rounded-full">
                  Get Started
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-primary">
                {/* <IconButton
                  aria-label="get for desktop"
                  title="get for desktop"
                >
                  <ComputerDesktopIcon className="w-6 h-6" />
                </IconButton> */}
                <IconButton aria-label="get for mobile" title="get for mobile">
                  <DevicePhoneMobileIcon className="w-6 h-6" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

//flex items-center justify-between w-full px-8
