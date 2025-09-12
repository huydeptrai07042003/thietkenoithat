import React from 'react';
import Button from '../../Components/button';
import { FaFacebookF } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <footer className=" text-center mx-20 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-15 pb-10 gap-5">
        <nav className="flex flex-col gap-1">
          <Button href="#">About Us</Button>
          <Button href="#">Privacy Policy</Button>
          <Button href="#">Terms of Service</Button>
        </nav>
        <div className="contact flex flex-col gap-1 text-start">
          <p>Chi nhánh Hà Nội:</p>
          <p className="text-sm">Số 11 Khuất Duy Tiến, Thanh Xuân, Hà Nội</p>
          <p>
            <span>Hotline:</span> 0344.65.3336
          </p>
          <p>Chi nhánh Hồ Chí Minh:</p>
          <p className="text-sm">Số 360Bis-360G Bến Vân Đồn, P. Vĩnh Hội, TP. Hồ Chí Minh</p>
          <p>
            <span>Hotline:</span> 0702.060.699
          </p>
        </div>
        <div className="social flex flex-col gap-1 text-start">
          <Button className=" flex items-center gap-4" href="https://www.facebook.com/kiengroup">
            <div className="text-blue-500">
              <FaFacebookF />
            </div>{' '}
            Facebook
          </Button>
          <Button href="#" className=" flex items-center gap-4">
            <div className="text-blue-500">
              <IoLogoTwitter />
            </div>{' '}
            Twitter
          </Button>
          <Button href="#" className=" flex items-center gap-4">
            <div className="text-red-600">
              <IoLogoInstagram />
            </div>{' '}
            YouTube
          </Button>
          <p>
            Gmail:{' '}
            <span>
              <Button href="#">kiengroup.vn@gmail.com</Button>
            </span>
          </p>
        </div>
        <p>© 2021 by Group_Kien . Proudly created with Group_Kien</p>
      </footer>
    </div>
  );
};

export default Footer;
