import React, { useState } from 'react';
import Button from '../../../Components/button';
import clsx from 'clsx';
import partner from '../../../assets/partner.avif'

interface Attr {
  name: string;
  slogan: string;
  content: string[];
}

const attribute: Attr[] = [
  {
    name: 'Tinh thần',
    slogan: 'Không gian nuôi dưỡng cảm xúc và tâm hồn',
    content: [
      'Tạo ra môi trường sống và làm việc mang lại cảm giác thư thái, hạnh phúc.',
      'Thiết kế hướng đến sự cân bằng, giúp giảm căng thẳng và gia tăng năng lượng tích cực.',
      'Kết hợp yếu tố thiên nhiên, ánh sáng, và dòng chảy không gian để kết nối con người với môi trường xung quanh.',
    ],
  },
  {
    name: 'Thẩm mỹ',
    slogan: 'Vẻ đẹp từ sự tinh tế và hài hòa',
    content: [
      'Đưa nghệ thuật và gu thẩm mỹ cao vào từng chi tiết thiết kế.',
      'Phong cách thiết kế hiện đại nhưng mang tính bền vững và cá nhân hóa, phản ánh câu chuyện và giá trị riêng của chủ nhân.',
      'Cân bằng giữa xu hướng hiện đại và bản sắc địa phương.',
    ],
  },
  {
    name: 'Công năng',
    slogan: 'Tiện ích tối ưu cho cuộc sống',
    content: [
      'Mỗi thiết kế đều tối ưu hóa công năng sử dụng, đảm bảo sự tiện lợi và hiệu quả.',
      'Sắp xếp không gian khoa học, tận dụng diện tích và tăng giá trị sử dụng lâu dài.',
      'Đáp ứng nhu cầu thực tế của người dùng, từ sinh hoạt, làm việc đến nghỉ ngơi.',
    ],
  },
];

const HeaderIntroduction: React.FC = () => {
  const [attr, setAttr] = useState<Attr>();
  return (
    <div>
      <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold pt-20 md:pt-30 text-center text-white italic">KIẾN GROUP</h1>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold py-5 md:py-10 text-center text-white italic">- Kiến tạo không gian Việt -</h2>
      <div className="md:text-xl bgBlue text-white rounded-2xl w-[80%] mx-auto px-10 py-2 my-5 md:my-10 shadow-2xl hover:shadow-blue-950 transition-shadow duration-300">
        <h1 className="my-5 ">KIẾN GROUP_KIẾN TẠO NGÔI NHÀ BẠN!</h1>
        <h2>Được thành lập 2016 lấy tiêu chí về chất lượng cuộc sống con người: </h2>
        <div className="w-full flex justify-around my-5 md:my-10 md:text-xl xl:text-2xl">
          {attribute.map((item, index) => {
            return (
              <Button
                onClick={() => setAttr(item)}
                key={index}
                className={clsx("p-1 md:p-2 rounded-sm cursor-pointer hover:opacity-50 hover:shadow transition-all duration-300 bgBrown border-4",attr?.name === item.name ? 'border-b-red-200':'border-transparent')}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
        <div className="bgBrown p-1 md:p-5 rounded-md md:my-10 lg:my-20 border-4">
          {attr ? (
            <>
              <p className="md:text-xl xl:text-2xl font-bold text-center my-5 border-b-2 py-2">{attr.slogan}</p>
              {attr.content.map((e, index) => {
                return <p key={index} className=' px-3 sm:px-5 md:px-10'>{e}</p>;
              })}
            </>
          ) : (
            <p className="md:text-xl xl:text-2xl font-bold text-center my-5">Chọn điều bạn muốn tìm hiểu</p>
          )}
        </div>
        <h2 className='my-5'>Chúng tôi mong muốn mang lại cho khách hàng những trải nghiệm mới về “ Không Gian Sống”, từ việc chỉnh chu về công năng, tối ưu về tiện ích và đa dạng về thẩm mỹ. Nhằm nâng cao chất lượng cuộc sống của con người hiện đại ngày nay.</h2>
        <h2 className='my-5'>Tuy nhiên để làm được điều này chúng tôi đã phải trải qua các bước chọn lọc về đội ngũ Kiến trúc Sư thiết kế tài năng nhất, nâng cấp nhà máy với những công nghệ hiện đại hàng đầu hiện nay.</h2>
        <div className=' md:w-[80%] mx-auto overflow-hidden object-cover rounded-xl relative my-10'>
          <img src={partner} alt='partner'/>
          <div className='absolute top-0 left-0 w-full h-full bg-amber-200/30'></div>
        </div>
        <h1 className="my-5 ">BỘ PHẬN THI CÔNG:</h1>
        <h2 className='my-5'>Chúng tôi hiểu được tâm tư và nguyện vọng của khách hàng là có một ngôi nhà ( căn hộ) chỉnh chu nhất, tương xứng với ngân sách mình bỏ ra.</h2>
        <h2 className='my-5'>Để hoàn thiện một cách chỉnh chu nhất, chúng tôi đã tổ chức bộ phận thi công bài bản nhất để đảm bảo chất lượng cũng như những yêu cầu của thiết kế. Bằng cách nhận hoàn thiện tổng thể căn hộ từ các hạng mục như sau:</h2>
        <ul>
          <li>- Xây dựng</li>
          <li>- Cơ điện M&E</li>
          <li>- Nội thất đồ gỗ, đồ rời, đồ decor trang trí.</li>
        </ul>
        
        <h1 className='my-10 bgBrown p-4 rounded-md'>Chúng tôi, đội ngũ <span className='text-black'>KIẾN GROUP</span> bằng nhiệt huyết, kiến thức và kinh nghiệm sẽ mang lại cho bạn ngôi nhà ưng ý nhất! Chất lượng nhất! Đúng với những gì chúng tôi đặt ra <span className='text-black'>“ Kiến tạo không gian Việt”</span></h1>
      </div>
    </div>
  );
};

export default HeaderIntroduction;
