import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

interface PROPS {
  search?: string;
  type?: string;
  place?: string;
  status?: string;
  mininteriorBudget?: number | '';
  maxinteriorBudget?: number | '';
  minroughBudget?: number | '';
  maxroughBudget?: number | '';
  limit?: number | '';
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: PROPS;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    type: '',
    place: '',
    status: '',
    search: '',
    mininteriorBudget: '',
    maxinteriorBudget: '',
    minroughBudget: '',
    maxroughBudget: '',
  },
};

//Thunk to Fetch product  by searching
export const fetchProductByFilter = createAsyncThunk<Product[], PROPS>(
  '/products/fetchProductByFilter',
  async (props: PROPS) => {
    const { search, type, place, status, mininteriorBudget, maxinteriorBudget, minroughBudget, maxroughBudget, limit } =
      props;

    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (type) query.append('type', type);
    if (place) query.append('place', place);
    if (status) query.append('status', status);
    if (mininteriorBudget) query.append('mininteriorBudget', String(mininteriorBudget));
    if (maxinteriorBudget) query.append('maxinteriorBudget', String(maxinteriorBudget));
    if (minroughBudget) query.append('minroughBudget', String(minroughBudget));
    if (maxroughBudget) query.append('maxroughBudget', String(maxroughBudget));
    if (limit) query.append('limit', String(limit));

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`);
    return response.data.products;
  },
);

// Thunk to Fetch single product
export const fetchProductDetail = createAsyncThunk<Product, string>(
  'products/fetchProductDetail',
  async (id: string) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
    return response.data;
  },
);

// Thunk to update product
export const updateProduct = createAsyncThunk<Product, { id: string; productData: Partial<Product> }>(
  'products/updateProduct',
  async ({ id, productData }: { id: string; productData: Partial<Product> }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  },
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        type: '',
        place: '',
        status: '',
        search: '',
        mininteriorBudget: '',
        maxinteriorBudget: '',
        minroughBudget: '',
        maxroughBudget: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //handle fetching with filter
      .addCase(fetchProductByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      //handle fetching detail product
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      //handle updating product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex((product) => product._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { setFilter, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
