import React from 'react';
import { FaGlobeEurope } from 'react-icons/fa';
import { TbSettingsAutomation } from 'react-icons/tb';
import { SiMaterialformkdocs } from 'react-icons/si';
import { GrTechnology } from 'react-icons/gr';

interface DIFFERENCE {
  name: string;
  icon: React.ReactElement;
  content: string;
}

const difference: DIFFERENCE[] = [
  {
    name: 'Tiêu chuẩn thiết kế Châu Âu',
    icon: <FaGlobeEurope />,
    content: '- Chúng tôi áp dụng các tiêu chuẩn thiết kế của Châu Âu về các modul trong sản xuất',
  },
  {
    name: 'Tự động hóa công nghệ cao',
    icon: <TbSettingsAutomation />,
    content:
      '- Toàn bộ được lập trình tự động hóa trên máy tính trong quá trình sản xuất, đáp ứng được những sự  khắt khe, tỉ mỉ của những thiết kế sáng tạo nhất.',
  },
  {
    name: 'Nguyên liệu cao cấp từ đối tác uy tín',
    icon: <SiMaterialformkdocs />,
    content: '- Đối tác về nguyên liệu chính của chúng tôi là An Cường - Hettich - Haflee - Malloca,…',
  },
  {
    name: 'Công nghệ liên kết hiện đại',
    icon: <GrTechnology />,
    content:
      '- Chúng tôi sử dụng các liên kết gỗ tốt nhất hiện nay như Hettich để đảm bảo liên kết gỗ cũng như độ bền trong khi sử dụng',
  },
];

interface STEP {
  name: string;
  content: string[];
}

const steps: STEP[] = [
  {
    name: '01.',
    content: [
      'Tìm hiểu nhu cầu cũng như mong muốn của khách hàng',
      '-Nhu cầu sử dụng không gian',
      '-Phong cách thiết kế',
      '-Ngân sách đầu tư',
      'Sau đó chúng tôi sẽ đưa ra những phân tích',
      '- Hiện trạng',
      '-Công năng',
      '-Ngân sách',
      '- Các gợi ý định hướng bằng các hình ảnh dẫn chứng',
    ],
  },
  {
    name: '02.',
    content: [
      '- Thống nhất về mặt bằng công năng, mặt bằng định vị nội thất',
      '- Triển khai ý tưởng thiết kế 2d, 3d',
      '- Đưa phương án thiết kế 3D',
      '- Duyệt sơ bộ và chỉnh sửa thiết kế',
      '- Hoàn thiện thiết kế 3D và 2D',
    ],
  },
  {
    name: '03.',
    content: ['-Bàn giao thiết kế, hồ sơ thi công', '-Bàn giao dự toán', '- Thống nhất dự toán và tiến hành thi công'],
  },
];

const HomeDiffer: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold py-10 md:my-20 w-fit mx-auto text-white">Sự khác biệt</h1>
      <div className="bgBlue w-[80%] mx-auto px-10 py-5 my-5 md:py-10 rounded-4xl">
        <h1 className="text-xl md:text-3xl font-bold my-5 md:my-10 text-white py-2">
          Sự chuẩn hóa từ thiết kế, đến các bước triển khai kỹ thuật thi công
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10">
          {difference.map((dif, index) => {
            return (
              <div
                key={index}
                className="group bg-white p-5 md:p-10 rounded-4xl text-blue-950 shadow-lg shadow-blue-700 border-8 border-transparent hover:border-blue-500 transition-colors duration-300"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl group-hover:animate-bounce ">{dif.icon}</div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold my-2 md:my-5">{dif.name}</h2>
                <p className="md:text-lg">{dif.content}</p>
              </div>
            );
          })}
        </div>
        <h1 className=" text-xl md:text-3xl font-bold my-10 md:my-20 text-white">Quy trình thiết kế</h1>
        <div className="flex  flex-col md:flex-row">
          {steps.map((step, index) => {
            return (
              <div key={index} className="group p-3 md:p-5 text-white border-l-2 md:border-t-2 md:border-l-0  w-full relative">
                <div className="absolute top-0 left-0 w-10 h-1 md:h-10 md:w-1 bg-white"></div>
                <h1 className="text-3xl md:text-5xl font-bold my-2 md:my-5">{step.name}</h1>
                {step.content.map((e, id) => {
                  return (
                    <p key={id} className="my-1 text-sm">
                      {e}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeDiffer;
