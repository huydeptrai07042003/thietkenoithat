import React from 'react';
import { VscFeedback } from 'react-icons/vsc';

const HeaderFeedback: React.FC = () => {
  return (
    <h1 className="text-6xl font-bold pt-25 text-center text-white italic ">
      Feedbacks nhà Kiến{' '}
      <span className="inline-block text-center text-blue-950">
        <VscFeedback />
      </span>
    </h1>
  );
};

export default HeaderFeedback;
