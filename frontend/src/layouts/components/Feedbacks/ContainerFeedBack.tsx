import React, { useState } from 'react';
import CardFeedback from './CardFeedback';
import { Button } from '@headlessui/react';
import DialogFeedback from './DialogFeedback';

const ContainerFeedBack: React.FC = () => {
  const [isOpened, setOpened] = useState<boolean>(false);
  return (
    <div className="w-full text-center">
      <Button
        onClick={() => setOpened(true)}
        className="px-6 py-2 bg-blue-500 shadow-md hover:opacity-70 transition-opacity duration-200 text-white rounded-md cursor-pointer my-10"
      >
        Post Your Feedback
      </Button>
      <div className="grid grid-cols-4 w-[90%] mx-auto gap-10">
        <CardFeedback />
        <CardFeedback />
        <CardFeedback />
        <CardFeedback />
        <CardFeedback />
      </div>
      {isOpened && <DialogFeedback isOpen={isOpened} setIsOpen={setOpened} />}
    </div>
  );
};

export default ContainerFeedBack;
