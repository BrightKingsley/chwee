"use client";

import { EventCardClass } from "@/models/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/app/components/client";
import { useRouter } from "next/navigation";
import { EVENTS } from "@/constants/routes";

export default function EventCards({
  eventCards = [
    {
      name: "Event 1",
      owner: "BriggSKvngZ",
    },
  ],
}: {
  eventCards: EventCardProps[];
}) {
  const { push } = useRouter();
  return (
    <Swiper
      className="w-[calc(100vw-3.5rem)] h-full"
      spaceBetween={1}
      breakpoints={{
        400: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      {eventCards.map((card, index) => (
        <SwiperSlide className="" key={index}>
          <div className="relative text-center border w-32 h-52 mx-auto border-primary flex flex-col p-3 rounded-md bg-white shadow-md shadow-primary/20">
            <div className="absolute top-0 left-0 text-center bg-primary w-full text-gray-200">
              <small>event card</small>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="">{card.name}</div>
              <div>{card.owner}</div>
            </div>
            <div className="rounded-full overflow-clip mt-auto">
              <Button onClick={() => push(`${EVENTS}/create`)} full>
                Use
              </Button>
            </div>
          </div>
          {/* works? */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
