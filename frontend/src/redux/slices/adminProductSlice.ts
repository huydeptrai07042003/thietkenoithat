import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

interface Product {
  _id: string;
  name: string;
  type: string;
  place: string;
  price: number;
}

interface INITIALSTATE {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: INITIALSTATE = {
  products: [],
  loading: false,
  error: null,
};

// thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk<Product[]>('adminProducts/fetchAdminProducts', async () => {
  const token = `Bearer ${localStorage.getItem('userToken')}`;
  const response = await axios.get(`${API_URL}/api/products`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data.products;
});

// thunk to create new products
export const createProduct = createAsyncThunk<Product, Partial<Product>>(
  'adminProducts/createProduct',
  async (productData) => {
    const token = `Bearer ${localStorage.getItem('userToken')}`;
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },
);

// thunk to update new products
export const updateProduct = createAsyncThunk<Product, { id: string; productData: Partial<Product> }>(
  'adminProducts/updateProduct',
  async ({ id, productData }) => {
    const token = `Bearer ${localStorage.getItem('userToken')}`;
    const response = await axios.put(`${API_URL}/api/products/${id}`, productData, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },
);

// thunk to delete product
export const deleteProduct = createAsyncThunk<string, string>('adminProducts/deleteProduct', async (id) => {
  const token = `Bearer ${localStorage.getItem('userToken')}`;
  await axios.delete(`${API_URL}/api/products/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return id;
});

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
