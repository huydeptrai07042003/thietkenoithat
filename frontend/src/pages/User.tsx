import React from 'react';
import Button from '../Components/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../redux/slices/authSlice';

const User: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen gap-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        {/* Header */}
        <h1 className="bg-red-300 text-white text-7xl py-3 items-center text-center font-semibold p-4 rounded-md">
          Hello User !
        </h1>
        {/* Nút Users */}
        <Button
          to="/admin/users"
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Go to Blog
        </Button>

        {/* Nút Products */}
        <Button
          onClick={handleLogOut}
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Log out
        </Button>
      </div>
    </>
  );
};

export default User;
