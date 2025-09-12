import React, { useState } from 'react';
import Button from '../Components/button';
import Input from '../Components/input';
import { loginUser } from '../redux/slices/authSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password })).unwrap();
    navigate('/admin')
  };

  return (
    <div className="bgBlue backdrop-blur text-white w-fit mt-30 mx-auto flex flex-col md:flex-row p-10 rounded-2xl shadow-2xl shadow-amber-50">
      <div className="border-r-0 md:border-r-2 md:mr-8 my-auto h-fit px-8 items-center">
        <h1 className="text-lg font-semibold uppercase text-center">Đăng nhập</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2">
          {/* Input */}
          <Input title="Email" placeholder="Email của bạn" value={email} setValue={setEmail} />
          <Input title="Mật khẩu" placeholder="Mật khẩu của bạn" value={password} setValue={setPassword} />
          <Button
            type="submit"
            className="p-2 mt-6 bg-red-300 text-black rounded-lg hover:opacity-50 transition-opacity duration-300 cursor-pointer"
          >
            Đăng nhập
          </Button>
        </form>
        <p className="text-sm mt-2 text-end px-2 text-gray-300">
          Bạn chưa có tài khoản?
          <span className="px-2 text-gray-200">
            <Button to="/signup">Đăng ký</Button>
          </span>
        </p>
      </div>
      <div className="hidden md:block w-150 h-100 object-center overflow-hidden rounded-2xl">
        <img
          className="w-full h-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1720192861639-1524439fc166?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
};

export default Login;
