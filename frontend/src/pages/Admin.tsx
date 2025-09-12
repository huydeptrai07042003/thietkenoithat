import React from 'react';
import Button from '../Components/button';

const Admin: React.FC = () => {
  return (
    <>
    <h1 className='bg-red-300 text-white text-7xl py-3 text-center font-semibold pt-30'>Hello Admin</h1>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen gap-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        {/* Nút Users */}
        <Button
          to="/admin/users"
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Users Monitoring
        </Button>
  
        {/* Nút Products */}
        <Button
          to="/admin/products"
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Products Monitoring
        </Button>
      </div>
    </>
   
  );
};

export default Admin;
