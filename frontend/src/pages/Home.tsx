import React from 'react';
import WelcomeHome from '../layouts/components/Home/WelcomeHome';
import HomeServices from '../layouts/components/Home/HomeServices';
import HomeCarousel from '../layouts/components/Home/HomeCarousel';
import HomeDiffer from '../layouts/components/Home/HomeDiffer';

const Home: React.FC = () => {
  return (
    <>
      <WelcomeHome />
      <HomeCarousel />
      <HomeServices />
      <HomeDiffer />
    </>
  );
};

export default Home;
