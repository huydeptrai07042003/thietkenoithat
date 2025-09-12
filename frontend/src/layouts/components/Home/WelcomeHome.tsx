import React from 'react';
import homeImg from '../../../assets/homeImg.avif'
import { ReactTyped } from 'react-typed';
const WelcomeHome:React.FC = () => {
  return (
      <div className="object-cover object-center overflow-hidden relative">
        <img className="w-full h-auto" src={homeImg} alt="Home Image" />
        <div className="w-full h-full bg-black opacity-70 absolute z-1 top-0 left-0"></div>
        <div className="z-2 absolute top-[20%] left-[2%] px-15 py-10">
          <div className="sm:text-4xl md:text-5xl lg:text-8xl font-bold text-white">Chào mừng đến</div>
          <ReactTyped
            strings={[' Kiến Group']}
            typeSpeed={80}
            backSpeed={40}
            backDelay={1500}
            loop
            className="sm:text-4xl md:text-5xl lg:text-8xl font-bold text-white"
          />
          <div className="sm:text-sm  md:text-md lg:text-2xl text-white sm:mt-5">Biến không gian thành nghệ thuật sống</div>
        </div>
      </div>
  );
};

export default WelcomeHome;
