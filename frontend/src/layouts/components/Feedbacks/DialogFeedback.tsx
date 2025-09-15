import { Button, Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { createFeedbacks } from '../../../redux/slices/feedbackSlice';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Form {
  rating: number;
  desc: string;
}

const DialogFeedback: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { isOpen, setIsOpen } = props;
  const user = localStorage.getItem('userInfo');
  const userName: string = user ? JSON.parse(user).name : '';
  const [form, setForm] = useState<Form>({
    rating: 0,
    desc: '',
  });
  const handleFormAfterOut = () => {
    setIsOpen(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createFeedbacks({
        user: userName,
        rate: form.rating,
        description: form.desc,
      }),
    );
    setForm({
      rating: 0,
      desc: '',
    });
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-10">
              <div>
                <label className="text-lg">Rate: </label>
                <div className="flex w-full my-4 justify-around text-center items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className=" items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={form.rating === star}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            rating: Number(e.target.value),
                          })
                        }
                        className="w-5 h-5 cursor-pointer accent-yellow-500"
                      />
                      <div>
                        {star} star{star > 1 ? 's' : ''}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-lg">Description:</label>
                <textarea
                  value={form.desc}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      desc: e.target.value,
                    });
                  }}
                  className="bg-white text-black my-2 p-4 rounded-xl"
                  placeholder=" Write your experience "
                />
              </div>
            </div>
            <Button
              type="submit"
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
