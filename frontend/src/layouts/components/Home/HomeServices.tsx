import React, { useState } from 'react';
import Button from '../../../Components/button';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface ADVANTAGE {
  name: string;
  para: string[];
}

const advantage: ADVANTAGE[] = [
  {
    name: 'KIẾN DESIGN: Thiết kế',
    para: [
      'Chúng tôi có một đội ngũ Kiến Trúc Sư chất lượng hàng đầu hiện nay, với những tư duy sáng tạo mới. Mỗi căn hộ được chúng tôi khoác lên những bộ áo khác nhau, phù hợp với mỗi nhu cầu của chủ căn hộ.',
    ],
  },
  {
    name: 'KIẾN FACTORY: Nhà máy sản xuất nội thất',
    para: [
      '+ Chúng tôi có nhà máy 1000m2 với đầy đủ các loại máy như:',
      '- Máy CNC 4 đầu Funing: Cắt tự động hoàn toàn',
      '- Máy dán cạnh 8 chức năng với 2 nồi keo riêng biệt phục vụ cho việc dán cạnh thẳng, dán cạnh 45 độ',
      '- Máy khoan ngang laze, định vị bằng tia laze đạt tỉ lệ chính xác đến 100%',
      '- Máy bo cong các tấm lamilate',
      '- Cùng nhiều hệ thống máy móc phụ trợ khác',
      '- Chúng tôi có xưởng sơn riêng biệt, đảm bảo tiêu chuẩn về sơn, sấy và lưu trữ thành phẩm. Giúp bề mặt luôn được căng mịn và đạt tiêu chuẩn về chất lượng.',
    ],
  },
  {
    name: 'KIẾN DECOR: Trang trí căn hộ sau khi hoàn thiện',
    para: [
      '- Chúng tôi cung cấp các mẫu decor như: Tượng, tranh, nến, sáp thơm, các vật dụng trang trí cho ngồi nhà của bạn trở nên sinh động hơn',
      '- Chúng tôi hoàn thiện những chi tiết nhỏ nhất từ những ngọn nến đến chiếc khăn trải bàn, và từng lọ sáp thơm trong căn hộ của bạn!',
    ],
  },
];

const HomeServices: React.FC = () => {
  const [isShow, setIsShow] = useState<number>(-1);
  const handleShow = (index: number) => {
    setIsShow((prevIndex) => (prevIndex === index ? -1 : index));
  };
  return (
    <div className="py-10 w-full">
      <h1 className="text-5xl font-bold py-10 text-center text-white">
        Tại sao lại chọn <span className="animate-pulse">Kiến Group</span>
      </h1>
      <div className="bgBlue text-white rounded-2xl w-[80%] flex flex-col justify-around text-center mx-auto px-4 py-2 text-2xl shadow-2xl hover:shadow-blue-950 transition-shadow duration-300">
        {advantage.map((ad, index) => {
          return (
            <Button
              onClick={() => handleShow(index)}
              key={index}
              className="py-2 cursor-pointer transition-colors duration-300 hover:text-red-300"
            >
              <div className={clsx('my-10', isShow === index ? 'border-b-2 text-red-300 ' : '')}>{ad.name}</div>
              <AnimatePresence>
                {isShow === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 px-4"
                  >
                    {ad.para.map((para, id) => {
                      return (
                        <motion.p
                          key={id}
                          className="text-lg text-blue-100 text-start py-5 bg-blue-950/50 rounded-md px-10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: id * 0.1 }}
                        >
                          {para}
                        </motion.p>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default HomeServices;
