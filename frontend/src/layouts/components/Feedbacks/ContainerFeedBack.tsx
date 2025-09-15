import React, { useEffect, useState } from 'react';
import CardFeedback from './CardFeedback';
import { Button } from '@headlessui/react';
import DialogFeedback from './DialogFeedback';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchFeedbacks } from '../../../redux/slices/feedbackSlice';

const ContainerFeedBack: React.FC = () => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { feedbacks, loading, error } = useAppSelector((state) => state.feedbacks);
  const validfeedbacks = feedbacks.filter((feedback) => feedback.approved === true);
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);
  return (
    <div className="w-full text-center">
      <Button
        onClick={() => setOpened(true)}
        className="px-6 py-2 bg-blue-500 shadow-md hover:opacity-70 transition-opacity duration-200 text-white rounded-md cursor-pointer my-10"
      >
        Post Your Feedback
      </Button>
      {loading && <p>loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] mx-auto gap-10">
        {validfeedbacks.map((validfeedback) => {
          return <CardFeedback key={validfeedback._id} item={validfeedback} />;
        })}
      </div>
      {isOpened && <DialogFeedback isOpen={isOpened} setIsOpen={setOpened} />}
    </div>
  );
};

export default ContainerFeedBack;
