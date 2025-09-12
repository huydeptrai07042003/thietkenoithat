import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface USER {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}
interface UpdateUserPayload {
  id: string;
  name?: string;
  email?: string;
  role: string;
}

interface RegisterError {
  message: string;
}

interface INITIALSTATE {
  users: USER[];
  loading: boolean;
  error: string | null;
}

const initialState: INITIALSTATE = {
  users: [],
  loading: false,
  error: null,
};

// fetch all users
export const fetchUsers = createAsyncThunk<USER[]>('admin/fetchUsers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
  });
  return response.data;
});

// Add the create user action
export const addUser = createAsyncThunk<
  USER,
  { name: string; email: string; password: string ;role:'customer'|'admin'},
  { rejectValue: { message: string } }
>('admin/addUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
    });
    return response.data.user;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<RegisterError>;
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(axiosError.response.data);
    }
    return rejectWithValue({ message: 'Unknown error occurred' });
  }
});

// Thunk to update user info
export const updateUser = createAsyncThunk<USER, UpdateUserPayload>(
  'admin/updateUser',
  async ({ id, name, email, role }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );
    return response.data;
  },
);

//Thunk to delete user
export const deleteUser = createAsyncThunk<string, string>('admin/deleteUser', async (id: string) => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
  return id;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        } else {
          state.users.push(updatedUser);
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message || 'Unknown error';
      });
  },
});

export default adminSlice.reducer;
