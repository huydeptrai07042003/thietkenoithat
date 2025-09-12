import React from 'react';
import HeaderIntroduction from '../layouts/components/Introduction/HeaderIntroduction';
import HomeServices from '../layouts/components/Home/HomeServices';

const Introduction: React.FC = () => {
  return (
    <>
      <HeaderIntroduction />
      <HomeServices />
    </>
  );
};

export default Introduction;
