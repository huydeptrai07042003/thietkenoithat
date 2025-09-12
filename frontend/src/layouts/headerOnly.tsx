import React from 'react';
import Header from './components/Header';

const HeaderLayout: React.ElementType = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default HeaderLayout;
