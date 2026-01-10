import React, { useRef, useState } from 'react';
//  Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


 
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";


// import './styles.css';

/*import required modules*/
import { Autoplay, Pagination, Navigation } from "swiper/modules";


export default function App() {
  return (

    <div className='h-[70vh] w-full  flex justify-center items-center'>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-transparent w-full h-full object-contain  flex justify-center items-center"
      >
         {/* 1 */}
        <SwiperSlide>
          <div className='flex w-full object-cover h-auto justify-center items-center' >
            <img  className='w-full cover' src="https://www.greenwashingindex.com/wp-content/uploads/2024/01/10-Essential-Eco-Friendly-Products-For-Green-Living.jpg" 
              alt=""/>
          </div>
        </SwiperSlide>

        {/* 2 */}
        <SwiperSlide >
          <div className='flex w-auto h-auto  object-cover justify-center items-center'>
            <img className=' object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RC5IuhqTHnQzVMzix_ugEfcbvh_WfZ5thokghtxrv8ULrC2ZpTEUGqvCsTpOG95vknM&usqp=CAU"  alt="" />

          </div>
        </SwiperSlide>

         {/* 3 */}
        <SwiperSlide>
          <div className='flex w-auto h-auto justify-center items-center'>
            <img src="https://dsb.edu.in/wp-content/uploads/2024/07/The-rise-of-Ecofriendly-packaging_DSB.png" alt="" />
          </div>
        </SwiperSlide>

         {/* 4 */}
        <SwiperSlide>
          <div className='flex w-auto h-auto justify-center items-center'>
            <img src="https://dsb.edu.in/wp-content/uploads/2024/07/5-ways-that-companies-adopt-sustainable-packaging-_DSB-1024x320.png" alt="" />
          </div>
        </SwiperSlide>

         {/* 5 */}
        <SwiperSlide>
          <div className='flex w-auto h-auto justify-center items-center'>
            <img src="https://apcocommunity.force.com/cms/delivery/media/MCX2I7VZHIBJAYXJLQL7W5RSGRUU "alt="" />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
