"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./custom.css";
import Image from "next/image";

export default function Carousel({ items }) {
  return (
    <div className="bg-white mt-10 !relative">
      <h2 className="text-2xl p-10 pb-0">Ofertas do dia</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="cursor-pointer w-100 flex flex-col items-center pt-15 py-20 bg-white text-black">
              <div className="h-50 w-50">

                <div className="relative w-full h-50">
                  <Image
                    src="/img/watch.png"
                    alt="Relógio"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

              </div>
              <p className="text-gray">Samsumg smart watch</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
