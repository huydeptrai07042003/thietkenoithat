import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.jpg';
import { CgMenu } from 'react-icons/cg';
import Button from '../../Components/button';
import clsx from 'clsx';
import { FaUser } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { useAppSelector } from '../../hooks/reduxHooks';

interface MENU {
  name: string;
  path: string;
}

const menu: MENU[] = [
  {
    name: 'TRANG CHỦ',
    path: '/',
  },
  {
    name: 'GIỚI THIỆU',
    path: '/introduction',
  },
  {
    name: 'DỰ ÁN',
    path: '/products',
  },
  {
    name: 'BLOG',
    path: '/#',
  },
];

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [opened, setOpened] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Nếu click ngoài cả menu và button thì mới đóng
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="opacity-0 xl:opacity-100 absolute z-2 top-5 left-5 w-20 rounded-3xl overflow-hidden object-cover object-center">
        <img className="w-full h-auto" src={logo} alt="logo" />
      </div>
      <div
        ref={menuRef}
        className={clsx(
          ' md:opacity-100 flex flex-col  md:flex-row text-center items-center justify-around md:justify-between px-5 lg:px-10 md:text-sm lg:text-lg italic fixed w-[100%] md:w-[80%] top-10 md:top-5 right-0 md:right-[50%] md:translate-x-[50%] z-[999] bg-gray-700 md:backdrop-blur-md text-white md:bg-white/10 rounded-xl shadow-2xl transition-all duration-300',
          opened
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto',
        )}
      >
        {menu.map((nav) => {
          return (
            <Button
              to={nav.path}
              onClick={() => setOpened(false)}
              className="cursor-pointer border-b-2 py-2 min-w-14 border-transparent hover:border-white transition-all duration-300 hover:opacity-70"
              key={nav.path}
            >
              {nav.name}
            </Button>
          );
        })}
        {!user && (
          <Button
            to="/login"
            onClick={() => setOpened(false)}
            className="cursor-pointer border-b-2 py-2 min-w-14 border-transparent hover:border-white transition-all duration-300 hover:opacity-70"
          >
            ĐĂNG NHẬP
          </Button>
        )}

        {user?.role === 'admin' && (
          <Button
            to="/admin"
            onClick={() => setOpened(false)}
            className="cursor-pointer border-b-2 py-2 min-w-14 border-transparent hover:border-white transition-all duration-300 hover:opacity-70 flex text-center items-center gap-2"
          >
            <RiAdminFill />
            <span className="uppercase">{user.name}</span>
          </Button>
        )}

        {user?.role === 'customer' && (
          <Button
            to="/user"
            onClick={() => setOpened(false)}
            className="cursor-pointer border-b-2 py-2 min-w-14 border-transparent hover:border-white transition-all duration-300 hover:opacity-70 flex text-center items-center gap-2"
          >
            <FaUser />
            <span className="uppercase">{user.name}</span>
          </Button>
        )}
      </div>
      <Button
        ref={buttonRef}
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-label="Toggle menu"
        className="opacity-100 md:opacity-0 fixed z-999 backdrop-blur-md text-white bg-white/10 rounded-md right-2 top-2 text-3xl sm:text-4xl w-fit h-fit"
      >
        <CgMenu />
      </Button>
    </>
  );
};

export default Header;
