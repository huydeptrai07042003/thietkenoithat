import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  if (loading) return <p className="text-white text-center">Đang tải dữ liệu...</p>;

  if (!project) return <p className="text-red-500 text-center">Không tìm thấy sản phẩm</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 rounded-2xl text-white mt-30 bgBlue">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={project.images[0]?.url}
          alt={project.images[0]?.altText || project.name}
          className="rounded-lg shadow-lg object-cover w-full h-[400px]"
        />
        <div className="space-y-4">
          <p><span className="font-bold">Địa điểm:</span> {project.place}</p>
          <p><span className="font-bold">Diện tích:</span> {project.acreage} m²</p>
          <p><span className="font-bold">Kiểu:</span> {project.type}</p>
          <p><span className="font-bold">Trạng thái:</span> {project.status}</p>
          <p><span className="font-bold">Ngân sách nội thất:</span> {project.interiorBudget.toLocaleString()} đ</p>
          <p><span className="font-bold">Ngân sách phần thô:</span> {project.roughBudget.toLocaleString()} đ</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
