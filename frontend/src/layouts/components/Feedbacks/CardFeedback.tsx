import React from 'react';
import { FaStar } from 'react-icons/fa';
import clsx from 'clsx';

interface feedBacks {
  _id: string;
  user: string;
  rate: number;
  description: string;
  approved: boolean;
}

interface PROPS {
  item: feedBacks;
}

const CardFeedback: React.FC<PROPS> = (props) => {
  const { item } = props;
  return (
    <div className="bgBlue text-white py-4 px-6 rounded-2xl space-y-2 shadow-2xl shadow-blue-900 hover:shadow-blue-300 transition-shadow duration-200">
      <h1>
        <span className="font-semibold text-md">Name: </span>
        {item.user}
      </h1>
      <div>
        <span className="font-semibold text-md">Rate: </span>
        <ul className="inline-flex">
          <li className={clsx(item.rate > 0 && 'text-amber-300')}>
            <FaStar />
          </li>
          <li className={clsx(item.rate > 1 && 'text-amber-300')}>
            <FaStar />
          </li>
          <li className={clsx(item.rate > 2 && 'text-amber-300')}>
            <FaStar />
          </li>
          <li className={clsx(item.rate > 3 && 'text-amber-300')}>
            <FaStar />
          </li>
          <li className={clsx(item.rate > 4 && 'text-amber-300')}>
            <FaStar />
          </li>
        </ul>
      </div>
      <p>
        <span className="font-semibold ">Description: </span> {item.description}{' '}
      </p>
    </div>
  );
};

export default CardFeedback;
