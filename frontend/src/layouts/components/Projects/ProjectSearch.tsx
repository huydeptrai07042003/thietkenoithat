import React, { useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
///Thư viện Tippy
import Tippy from '@tippyjs/react/headless';
//Thêm data tìm kiếm
import { searchApi } from '../../../apiServices/searchApi';
//
import Button from '../../../Components/button';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { fetchProductByFilter } from '../../../redux/slices/productSlice';
import { useSearchParams } from 'react-router-dom';
//

interface Api {
  _id: number;
  name: string;
}

// type,
// place,
// status,
// mininteriorBudget,
// maxinteriorBudget,
// minroughBudget,
// maxroughBudget,

const ProjectSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const [getApi, setGetApi] = useState<Api[]>([]);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('all');
  const [place, setPlace] = useState<string>('all');
  const [isShow, setIsShow] = useState<boolean>(true);

  //
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(
      fetchProductByFilter({
        type: type === 'all' ? '' : type,
        place: place === 'all' ? '' : place,
        ...queryParams,
      }),
    );
  }, [type, place]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onHideResult = () => {
    setIsShow(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (name.trim() === '') {
          setGetApi([]); // Clear data khi input rỗng
          return; // Dừng lại, không gọi API
        }
        const res = await searchApi(name);
        setGetApi(res.products || []);
      } catch (err) {
        console.error(err);
        setGetApi([]);
      }
    };
    fetchData();
  }, [name]);

  return (
    <div className="bgBlue my-10 py-5 text-white text-xl ">
      <div className="flex flex-col gap-5 lg:gap-0 items-center lg:flex-row xl:w-[70%] justify-around">
        <label className="text-2xl font-bold">SEARCHBAR</label>
        <Tippy
          render={(attrs) => (
            <div
              className="box text-md lowercase bg-black/20 dark:bg-white/30 dark:text-black text-white backdrop-blur-sm px-4 mt-1 w-[300px] py-2 rounded-lg flex flex-col max-h-[200px] overflow-hidden overflow-y-scroll"
              tabIndex={-1}
              {...attrs}
            >
              <div className="">
                {getApi?.map((e) => {
                  return (
                    <Button key={e._id} to={`/products/${e._id}`}>
                      <div className=" hover:opacity-50 transition-opacity duration-300 cursor-pointer py-1 ">
                        {e.name}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          placement="bottom"
          visible={isShow && name.trim() !== '' && getApi.length > 0}
          interactive
          onClickOutside={onHideResult}
        >
          <div className="xl:ms-12 text-center">
            <div className=" rounded-2xl relative">
              <input
                className="px-10 py-2 border-0 rounded-2xl text-black overflow-hidden bg-white h-full items-center"
                ref={inputRef}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onFocus={() => setIsShow(true)}
                value={name}
              />
              {name && (
                <Button
                  className="absolute top-[50%] cursor-pointer translate-y-[-50%] right-2 text-black"
                  onClick={() => {
                    setName('');
                    inputRef.current?.focus();
                  }}
                >
                  <FaXmark />
                </Button>
              )}
            </div>
          </div>
        </Tippy>
        <div>
          <select
            name="place"
            id="place"
            className=" p-2 rounded-xl border border-gray-600 bg-gray-800 text-white italic text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-300"
            onChange={(e) => setPlace(e.target.value)}
          >
            <option value="all" hidden>
              Địa điểm
            </option>
            <option value="all">Tất cả</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hochiminh">Hồ Chí Minh</option>
            <option value="phutho">Phú Thọ</option>
            <option value="thainguyen">Thái Nguyên</option>
            <option value="binhduong">Bình Dương</option>
          </select>
        </div>
        <div>
          <select
            name="conditional"
            id="conditional"
            className=" p-2 rounded-xl border border-gray-600 bg-gray-800 text-white italic text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-300 w-32"
            onChange={(e) => setType(e.target.value)}
          >
            {/* <option value="">Hiện trạng</option>
            <option value="">Căn hộ cũ cải tạo lại</option>
            <option value="">Hoàn thiện cơ bản</option>
            <option value="">Nhận bàn giao thô</option> */}
            <option value="all" hidden>
              Thể loại
            </option>
            <option value="all">Tất cả</option>
            <option value="chungcu">Chung cư</option>
            <option value="nhadat">Nhà đất</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectSearch;
