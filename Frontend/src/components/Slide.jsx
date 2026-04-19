import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <div className='w-full flex justify-center items-center py-6'>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-[85%]"
      >

        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full aspect-[951/464] bg-black flex items-center justify-center rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/5490168052d38f32.jpg?q=60"
              alt="buds"
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="w-full aspect-[951/464] bg-black flex items-center justify-center rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/e2620e20463c6c4a.png?q=60"
              alt="watch"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="w-full aspect-[951/464] bg-black flex items-center justify-center rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/fe7574d75bf6c2b9.png?q=60"
              alt="tablet"
            />
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="w-full aspect-[951/464] bg-black flex items-center justify-center rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/df24390167155b23.png?q=60"
              alt="laptop"
            />
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div className="w-full aspect-[951/464] bg-black flex items-center justify-center rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/c2dd7b0e0aec86ce.png?q=60"
              alt="powerbank"
            />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}