import React from 'react';
import { FaStar } from "react-icons/fa";
const CardFeedback: React.FC = () => {
  return (
    <div className="bgBlue text-white py-4 px-6 rounded-2xl space-y-2 shadow-2xl shadow-blue-900 hover:shadow-blue-300 transition-shadow duration-200">
      <h1>
        <span className="font-semibold text-md">Name: </span>Huy
      </h1>
      <div>
        <span className="font-semibold text-md">Rate: </span>
        <ul className="inline-flex">
          <li className="text-amber-300">
            <FaStar />
          </li>
          <li>
            <FaStar />
          </li>
          <li>
            <FaStar />
          </li>
          <li>
            <FaStar />
          </li>
          <li>
            <FaStar />
          </li>
        </ul>
      </div>
      <p>
        <span className="font-semibold ">Description: </span> Awsome service!! I will recommend to my friends{' '}
      </p>
    </div>
  );
};

export default CardFeedback;
