import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useMemo } from 'react';
import { Button } from '@headlessui/react';

interface IMG {
  url: string;
  altText?: string;
}

interface Item {
  _id: string;
  name: string;
  type: string;
  place: string;
  acreage: number;
  status: string;
  interiorBudget: number;
  roughBudget: number;
  images: IMG[];
}

const SingleProject: React.FC = () => {
  //
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  //Random pics per col
  // Hàm chia mảng thành nhóm random từ 1-3 phần tử
  const groupProjects = (list: IMG[]): IMG[][] => {
    const result: IMG[][] = [];
    let i = 0;

    while (i < list.length) {
      const groupSize = Math.floor(Math.random() * 3) + 1; // random từ 1-3
      result.push(list.slice(i, i + groupSize));
      i += groupSize;
    }
    return result;
  };

  // Chỉ random lại khi products thay đổi
  const groupedImages = useMemo(() => {
    return project ? groupProjects(project.images) : [];
  }, [project]);

  //HandlePickImg
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleShowImg = (e: string) => {
    setIsOpen(true);
    setSelectedImage(e);
  };
  //Loading
  if (loading) return <p className="text-white text-center">Đang tải dữ liệu...</p>;

  if (!project) return <p className="text-red-500 text-center">Không tìm thấy sản phẩm</p>;

  return (
    <div>
      <div className="max-w-5xl mx-auto p-8 rounded-2xl text-white mt-30 bgBlue">
        <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={project.images[0]?.url}
            alt={project.images[0]?.altText || project.name}
            className="rounded-lg shadow-lg object-cover w-full h-[400px]"
          />
          <div className="space-y-4">
            <p>
              <span className="font-bold">Địa điểm:</span>{' '}
              {project.place === 'hochiminh'
                ? 'Hồ Chí Minh'
                : project.place === 'hanoi'
                ? 'Hà Nội'
                : project.place === 'phutho'
                ? 'Phú Thọ'
                : project.place}
            </p>
            <p>
              <span className="font-bold">Diện tích:</span> {project.acreage} m²
            </p>
            <p>
              <span className="font-bold">Kiểu:</span>{' '}
              {project.type === 'nhadat' ? 'Nhà đất' : project.type === 'chungcu' ? 'Chung cư' : project.type}
            </p>
            <p>
              <span className="font-bold">Trạng thái:</span> {project.status}
            </p>
            <p>
              <span className="font-bold">Ngân sách nội thất:</span> {project.interiorBudget.toLocaleString()} đ
            </p>
            <p>
              <span className="font-bold">Ngân sách phần thô:</span> {project.roughBudget.toLocaleString()} đ
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-5 md:w-[90%] mx-auto mb-10 mt-10">
        {groupedImages.map((group, rowIndex) => (
          <div key={rowIndex} className="flex flex-col md:flex-row gap-6 w-full">
            {group.map((image, colIndex) => (
              <Button
                key={colIndex}
                className="w-full group relative overflow-hidden rounded-xl hover:shadow-md shadow-blue-900 transition-shadow duration-300 cursor-pointer"
                onClick={() => handleShowImg(image.url)}
              >
                <img
                  className="w-full h-80 object-cover hover:scale-110 transition-transform duration-300"
                  src={image.url}
                  alt={image.altText || `Project ${rowIndex + 1}-${colIndex + 1}`}
                />
              </Button>
            ))}
          </div>
        ))}
      </div>
      {isOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <img src={selectedImage} alt="" className="mt-15 max-h-[85%] max-w-[90%]" />
        </div>
      )}
    </div>
  );
};

export default SingleProject;
