import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { deleteProduct, fetchAdminProducts } from '../../../redux/slices/adminProductSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/button';

const AdminProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useAppSelector((state) => state.adminProduct);
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (_id: string) => {
    if (window.confirm('Are you sure you want to delete the Product?')) {
      dispatch(deleteProduct(_id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR:{error}</p>;

  const handleEdit = (id: string) => {
    console.log('Edit product with id:', id);
    navigate(`/admin/products/${id}`)
  };

  return (
    <div className="p-8 max-w-4xl mx-auto mt-15 relative">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-6 sm:text-center">Product Management</h1>
      {/* Button Get Back */}
      <Button
        to="/admin"
        className="absolute top-0 right-1 p-2 mt-6 bgBlue text-white rounded-lg hover:opacity-50 transition-opacity duration-300 cursor-pointer"
      >
        Back to Admin
      </Button>
      {/* Bảng quản lý sản phẩm */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">TYPE</th>
              <th className="px-4 py-2">PLACE</th>
              <th className="px-4 py-2 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t bg-white hover:bg-gray-50">
                <td className="px-4 py-2 font-medium  uppercase">{product.name}</td>
                <td className="px-4 py-2 capitalize">{product.type}</td>
                <td className="px-4 py-2 capitalize">{product.place}</td>
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
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

export default AdminProducts;
