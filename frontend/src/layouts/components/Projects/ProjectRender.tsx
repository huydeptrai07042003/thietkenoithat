import { useAppSelector } from '../../../hooks/reduxHooks';
import type { Item } from '../../../Components/carouselCard';
import Button from '../../../Components/button';
import { useMemo } from 'react';

const ProjectRender: React.FC = () => {
  // Lấy danh sách sản phẩm từ Redux
  const { products } = useAppSelector((state) => state.products);

  // Hàm chia mảng thành nhóm random từ 1-3 phần tử
  const groupProjects = (list: Item[]): Item[][] => {
    const result: Item[][] = [];
    let i = 0;

    while (i < list.length) {
      const groupSize = Math.floor(Math.random() * 3) + 1; // random từ 1-3
      result.push(list.slice(i, i + groupSize));
      i += groupSize;
    }
    return result;
  };

  // Chỉ random lại khi products thay đổi
  const groupedImages = useMemo(() => groupProjects(products), [products]);

  return (
    <div className="flex flex-col gap-6 px-5 md:w-[90%] mx-auto mb-10">
      {groupedImages.map((group, rowIndex) => (
        <div key={rowIndex} className="flex flex-col md:flex-row gap-6 w-full">
          {group.map((item) => (
            <div key={item._id} className="flex flex-col text-center items-center flex-1">
              <Button to={`/products/${item._id}`} className="w-full group relative overflow-hidden cursor-pointer">
                <img
                  className="w-full h-80 object-cover rounded-lg shadow-md hover:opacity-50 transition-opacity duration-300"
                  src={item.images[0]?.url}
                  alt={item.images[0]?.altText || `Project ${rowIndex + 1}-${item._id + 1}`}
                />
                {/* Overlay mờ */}
                <div className="absolute bottom-[-100%] left-0 w-full h-full bg-black/70 transition-all duration-300 group-hover:bottom-0"></div>

                {/* Thông tin dự án */}
                <div className="absolute top-[40%] text-xl left-[-100%] text-white w-full opacity-0 h-full transition-all duration-300 group-hover:left-0 group-hover:opacity-100">
                  <p>
                    <span className="font-bold">Địa điểm:</span>{' '}
                    {item.place === 'hochiminh'
                      ? 'Hồ Chí Minh'
                      : item.place === 'hanoi'
                      ? 'Hà Nội'
                      : item.place === 'phutho'
                      ? 'Phú Thọ'
                      : item.place}
                  </p>
                  <p>
                    <span className="font-bold">Diện tích:</span> {item.acreage} m²
                  </p>
                  <p>
                    <span className="font-bold">Kiểu:</span>{' '}
                    {item.type === 'nhadat' ? 'Nhà đất' : item.type === 'chungcu' ? 'Chung cư' : item.type}
                  </p>
                </div>
              </Button>
              {/* Tên dự án */}
              <p className="mt-3 text-lg font-semibold text-white uppercase">{item.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectRender;
