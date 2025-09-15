import { Button, Dialog } from '@headlessui/react';
import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogFeedback: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;
  const handleFormAfterOut = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onClose={() => handleFormAfterOut()} className="relative z-50">
      {/* Overlay (nền mờ phía sau) */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-lg bgBlue text-white p-6 shadow-lg">
          {/* X out ra ngoai */}
          <Button className="absolute top-0 right-0 p-6 cursor-pointer text-4xl" onClick={() => handleFormAfterOut()}>
            <FaRegWindowClose />
          </Button>
          {/* Content */}
          <h1 className="font-semibold text-3xl border-b-2 pb-2">Feedbacks Form</h1>
          <form>
            <div className="mt-10">
              <div>
                <label className="text-lg">Rate: </label>
                <div className="flex w-full my-4 justify-around text-center items-center">
                  <div>
                    <input className="w-5 h-5 cursor-pointer" type="radio" />
                    <p>1 star</p>
                  </div>
                  <div>
                    <input className="w-5 h-5 cursor-pointer" type="radio" />
                    <p>2 star</p>
                  </div>
                  <div>
                    <input className="w-5 h-5 cursor-pointer" type="radio" />
                    <p>3 star</p>
                  </div>
                  <div>
                    <input className="w-5 h-5 cursor-pointer" type="radio" />
                    <p>4 star</p>
                  </div>
                  <div>
                    <input className="w-5 h-5 cursor-pointer" type="radio" />
                    <p>5 star</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-lg">Description:</label>
                <textarea className="bg-white text-black my-2 p-4 rounded-xl" placeholder=" Write your experience " />
              </div>
            </div>
            <Button
              type="submit"
              onClick={() => {}}
              className="px-6 py-2 bg-blue-500 shadow-md hover:opacity-70 transition-opacity duration-200 text-white rounded-md cursor-pointer mt-5"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogFeedback;
