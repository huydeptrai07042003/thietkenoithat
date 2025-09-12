import { request } from '../utils/https';
export const searchApi = async (search = '') => {
  const res = await request.get('/api/products', {
    params: {
      search,
    },
  });
  return res.data;
};
