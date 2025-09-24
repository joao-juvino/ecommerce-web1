"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./custom.css";
import Card from "@/app/components/Card";

export default function Carousel({ title, items }) {
  return (
    <div className="bg-white mt-10 !relative">
      <h2 className="text-2xl p-10 pb-0">{title}</h2>
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
            <Card/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
