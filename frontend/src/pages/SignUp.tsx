import React, { useState } from 'react';
import Button from '../Components/button';
import Input from '../Components/input';
import { registerUser } from '../redux/slices/authSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <div className="bgBlue text-white w-fit mt-30 mx-auto flex flex-col md:flex-row p-10 rounded-2xl shadow-2xl shadow-amber-50">
      <div className="hidden md:block w-150 h-100 object-center overflow-hidden rounded-2xl">
        <img
          className="w-full h-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1677341558055-832134a85ad6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="border-l-0 md:border-l-2 my-auto h-fit md:ml-8 px-8">
        <h1 className="text-lg font-semibold uppercase text-center">Đăng kí</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2">
          {/* Input */}
          <Input title="Tên" placeholder="Tên của bạn" value={name} setValue={setName} />
          <Input title="Email" placeholder="Email của bạn" value={email} setValue={setEmail} />
          <Input title="Mật khẩu" placeholder="Mật khẩu của bạn" value={password} setValue={setPassword} />
          <Button
            type="submit"
            className="p-2 mt-6 bg-red-300 text-black rounded-lg hover:opacity-50 transition-opacity duration-300 cursor-pointer"
          >
            Đăng kí
          </Button>
        </form>
        <p className="text-sm mt-2 text-end px-2 text-gray-300">
          Bạn đã có tài khoản?
          <span className="px-2 text-gray-200">
            <Button to="/login">Đăng Nhập</Button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
