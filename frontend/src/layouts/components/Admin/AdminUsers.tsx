import React, { useEffect, useState } from 'react';
import Input from '../../../Components/input';
import Button from '../../../Components/button';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../../redux/slices/adminSlice';

const AdminUsers: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { users, loading, error } = useAppSelector((state) => state.admin);
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);
  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addUser({ name, email, password, role }));
    setName('');
    setEmail('');
    setPassword('');
    setRole('customer');
  };

  const handleChangeRole = async (userId: string, newRole: 'customer' | 'admin') => {
    await dispatch(updateUser({ id: userId, role: newRole }));
    dispatch(fetchUsers()); // fetch lại toàn bộ users
  };

  const handleDeleteRole = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto mt-15 relative">
      {/* Header */}
      <h1 className="text-2xl font-bold md:mb-8 text-center">User Management</h1>
      {/* Button Get Back */}
      <Button
        to="/admin"
        className="md:absolute  md:top-0 md:right-1 inline-block my-2 p-2 mt-6 bgBlue text-white rounded-lg hover:opacity-50 transition-opacity duration-300 cursor-pointer"
      >
        Back to Admin
      </Button>
      {/* Form thêm user */}
      <div className="bgBlue p-6 rounded-lg shadow-md mb-10 text-white">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        {loading && <p>loading...</p>}
        {error && <p>Error: {error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input title="Name" placeholder="Enter user name" value={name} setValue={setName} />
          <Input title="Email" placeholder="Enter user email" value={email} setValue={setEmail} />
          <Input title="Password" placeholder="Enter password" value={password} setValue={setPassword} />

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="ms-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'customer' | 'admin')}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option className="text-black" value="customer">
                Customer
              </option>
              <option className="text-black" value="admin">
                Admin
              </option>
            </select>
          </div>

          {/* Nút submit */}
          <Button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-fit"
          >
            Add User
          </Button>
        </form>
      </div>

      {/* Bảng quản lý user */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 whitespace-nowrap">NAME</th>
              <th className="px-4 py-2 whitespace-nowrap">EMAIL</th>
              <th className="px-4 py-2 whitespace-nowrap">ROLE</th>
              <th className="px-4 py-2 text-center whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user._id, e.target.value as 'customer' | 'admin')}
                    className="px-3 py-1 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <Button
                    onClick={() => handleDeleteRole(user._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
