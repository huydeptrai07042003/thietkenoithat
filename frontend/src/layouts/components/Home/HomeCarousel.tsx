import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
//
import Button from '../../../Components/button';
import CardCarousel from '../../../Components/carouselCard';
import axios from 'axios';
//type
import type { Item } from '../../../Components/carouselCard';
const HomeCarousel: React.FC = () => {
  const [newArrival, setNewArrival] = useState<Item[]>([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
        setNewArrival(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold py-20 w-fit mx-auto text-white">Các dự án nổi bật</h1>
      <p></p>
      <Swiper
        modules={[Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
          1300: {
            slidesPerView: 4,
          },
        }}
        autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={2500}
        loop={newArrival.length > 3}
      >
        {newArrival.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Button className="group cursor-pointer rounded-t-4xl border-transparent hover:border-orange-100 rounded-2xl border-2 transition-colors duration-300 items-center">
                <CardCarousel item={item} />
              </Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
