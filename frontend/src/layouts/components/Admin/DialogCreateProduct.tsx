import { Dialog, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import { useState } from 'react';
import { createProduct } from '../../../redux/slices/adminProductSlice';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import clsx from 'clsx';

interface PROP {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ImageType {
  url: string;
  altText?: string; // optional
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

const DialogCreateProduct = (props: PROP) => {
  const { status, setStatus } = props;
  const [uploading, setUploading] = useState(false);
  //dispatch
  const dispatch = useAppDispatch();
  //Product
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
  //
  const handleFormAfterOut = () => {
    setStatus(false);
    setFormData({
      name: '',
      type: '',
      place: '',
      interiorBudget: '',
      roughBudget: '',
      acreage: '',
      status: '',
      images: [],
    });
  };
  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createProduct(formData));
    handleFormAfterOut();
  };

  return (
    <Dialog open={status} onClose={() => handleFormAfterOut()} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 transition-opacity duration-300" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-fit transition-all transform mt-15">
          <div className="">
            <div className="max-w-xl mx-auto p-10 bgBlue text-white rounded-md ">
              <h2 className="text-2xl font-bold mb-4">Manage Product</h2>
              <form onSubmit={handleSubmit} className="w-full space-y-2">
                <div className="flex space-x-4">
                  <div className="space-y-2">
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
                  </div>

                  <div className="space-y-2">
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
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  >
                    <option className="text-black" value="" hidden>
                      Trạng thái
                    </option>
                    <option className="text-black" value="Căn hộ cũ cải tạo lại">
                      Căn hộ cũ cải tạo lại
                    </option>
                    <option className="text-black" value="Hoàn thiện cơ bản">
                      Hoàn thiện cơ bản
                    </option>
                    <option className="text-black" value="Nhận bàn giao thô">
                      Nhận bàn giao thô
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block mb-1">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full bgBrown cursor-pointer ps-2 py-2 rounded-sm"
                  />
                  {uploading && <div>Uploading Images...</div>}
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

                <button
                  type="submit"
                  disabled={uploading}
                  className={clsx(
                    'w-full cursor-pointer text-white p-2 rounded',
                    uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500',
                  )}
                >
                  {uploading ? 'Uploading...' : 'Create Product'}
                </button>
              </form>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleFormAfterOut()}
                  className="px-4 text-black py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogCreateProduct;
