import React, { useEffect } from 'react';
import Button from '../../../Components/button';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { deleteFeedbacks, fetchFeedbacks, updateFeedbacks } from '../../../redux/slices/feedbackSlice';
//icon
import { FaStar } from 'react-icons/fa';

const FeedbacksMornitoring: React.FC = () => {
  const dispatch = useAppDispatch();
  const { feedbacks, loading, error } = useAppSelector((state) => state.feedbacks);
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);
  const handleChangeAprroved = async (feedbackId: string, newApproved: true | false) => {
    await dispatch(updateFeedbacks({ id: feedbackId, newFeedback: { approved: newApproved } }));
    dispatch(fetchFeedbacks()); // fetch lại toàn bộ feedbacks
  };
  const handleDelete = (_id: string) => {
    if (window.confirm('Are you sure you want to delete this Feedback?')) {
      dispatch(deleteFeedbacks(_id));
    }
  };
  return (
    <div className="p-8 max-w-4xl mx-auto mt-15 relative">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold md:mb-6 text-center">Feedbacks Management</h1>
      {/* Button Get Back */}
      <Button
        to="/admin"
        className="md:absolute  md:top-0 md:right-1 inline-block my-2 p-2 mt-6 bgBlue text-white rounded-lg hover:opacity-50 transition-opacity duration-300 cursor-pointer"
      >
        Back to Admin
      </Button>
      {/* Bảng quản lý sản phẩm */}
      {loading && <p>loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">RATE</th>
              <th className="px-4 py-2">DESCRIPTION</th>
              <th className="px-4 py-2 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className="border-t bg-white hover:bg-gray-50">
                <td className="px-4 py-2 capitalize items-center flex gap-1">
                  {feedback.rate}{' '}
                  <span className="text-amber-300 items-center ">
                    <FaStar />
                  </span>{' '}
                </td>
                <td className="px-4 py-2 capitalize">{feedback.description}</td>
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  <select
                    value={feedback.approved.toString()}
                    onChange={(e) => handleChangeAprroved(feedback._id, e.target.value === 'true')}
                    className="px-3 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value={'true'}>Approve</option>
                    <option value={'false'}>Reject</option>
                  </select>
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbacksMornitoring;
