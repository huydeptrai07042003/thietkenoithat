import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetail, updateProduct } from '../../../redux/slices/productSlice';
import axios from 'axios';

export interface ImageType {
  url: string;
  altText?: string; // optional
}

export interface Product {
  _id: string;       // MongoDB ObjectId → string
  name: string;
  type: string;
  place: string;
  interiorBudget: number;
  roughBudget: number;
  acreage: number;
  status: string;
  images: ImageType[];
  user?: string;     // _id của admin
}

interface ProductForm {
  name: string;
  type: string;
  place: string;
  interiorBudget: string;
  roughBudget: string;
  acreage: string;
  status: string;
  images: ImageType[];
}

const ProductManage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, loading, error } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    type: '',
    place: '',
    interiorBudget: '',
    roughBudget: '',
    acreage: '',
    status: '',
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // Fetch product detail
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);

  // Populate form when selectedProduct is loaded
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || '',
        type: selectedProduct.type || '',
        place: selectedProduct.place || '',
        interiorBudget: selectedProduct.interiorBudget?.toString() || '',
        roughBudget: selectedProduct.roughBudget?.toString() || '',
        acreage: selectedProduct.acreage?.toString() || '',
        status: selectedProduct.status || '',
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image uploads
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const dataForm = new FormData();
        dataForm.append('image', file);
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, dataForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return { url: data.imageUrl, altText: '' };
      });
      const uploadedImages = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      console.error('No product id');
      return;
    }

    const productData = await {
      ...formData,
      interiorBudget: formData.interiorBudget ? Number(formData.interiorBudget) : undefined,
      roughBudget: formData.roughBudget ? Number(formData.roughBudget) : undefined,
      acreage: formData.acreage ? Number(formData.acreage) : undefined,
    };

    await dispatch(updateProduct({ id, productData }));
    navigate('/admin/products');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;

  return (
    <div className="max-w-xl mx-auto p-10 mt-20 bgBlue text-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manage Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(['name', 'type', 'place'] as (keyof ProductForm)[]).map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] as string}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        {(['interiorBudget', 'roughBudget', 'acreage'] as (keyof ProductForm)[]).map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="number"
              name={field}
              value={formData[field] as string}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full bgBrown cursor-pointer ps-2 py-2 rounded-sm"
          />
          {uploading && <p>Uploading Images...</p>}
          <div className="flex mt-2 gap-2 flex-wrap">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.altText || `preview-${idx}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductManage;
