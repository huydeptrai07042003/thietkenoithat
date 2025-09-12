import React from 'react';

interface IMG {
  url: string;
  altText?: string;
}

export interface Item {
  _id: string; 
  images: IMG[];
  place: string;
  acreage: number;
  type: string;
  name: string;
}

interface CardCarouselProps {
  item: Item;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ item }) => {
  return (
    <div className="rounded-t-4xl rounded-b-xl shadow-2xl">
      <div className="w-[300px] h-[400px] object-cover mx-auto rounded-4xl overflow-hidden relative">
        <img
          className="w-full h-[100%] group-hover:scale-110 transition-transform duration-300"
          src={item.images[0].url}
          alt={item.images[0].altText}
        />
        <div className="absolute bottom-[-100%] left w-full h-full bg-black/70 transition-all duration-300 group-hover:bottom-0"></div>
        <div className="absolute top-[40%] text-xl left-[-100%] text-white w-full opacity-0 h-full transition-all duration-500 group-hover:left-0 group-hover:opacity-100">
          <p>
            <span className="font-bold">Địa điểm:</span> {item.place}
          </p>
          <p>
            <span className="font-bold">Diện tích:</span> {item.acreage} m2
          </p>
          <p>
            <span className="font-bold">Kiểu:</span> {item.type}
          </p>
        </div>
      </div>
      <p className="text-md uppercase pb-2 py-2 text-center items-center text-white">{item.name}</p>
    </div>
  );
};

export default CardCarousel;
