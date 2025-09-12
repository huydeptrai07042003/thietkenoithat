import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface USER {
  name?: string;
  email: string;
  password: string;
  role?: string;
}

// Define a type for the slice state
interface INITIALSTATE {
  user: USER | null;
  guestId: string;
  loading: boolean;
  error: string | null;
}

interface RegisterError {
  message: string;
}

//Retrieve user info and token from localStorage if available
const getUserFromStorage = (): USER | null => {
  const userData = localStorage.getItem('userInfo');
  if (!userData) return null;
  try {
    return JSON.parse(userData) as USER;
  } catch (error) {
    console.error("Invalid JSON in localStorage for 'userInfo':", error);
    return null;
  }
};
const userFromStorage = getUserFromStorage();

// Check for an existing guest ID in the localStorage or generate a new One
const initialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', initialGuestId);

// Define the initial state using that type
const initialState: INITIALSTATE = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

//Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      localStorage.setItem('guestId', state.guestId);
    },
    generrateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem('guestId', state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Unknown error';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Unknown error';
      });
  },
});

export const { logout, generrateNewGuestId } = authSlice.actions;
export default authSlice.reducer;

// Async Thunk for User Login
export const loginUser = createAsyncThunk<
  USER,
  { email: string; password: string },
  { rejectValue: { message: string } }
>('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    localStorage.setItem('userToken', response.data.token);
    return response.data.user;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<RegisterError>;
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(axiosError.response.data);
    }
    return rejectWithValue({ message: 'Unknown error occurred' });
  }
});

// Async Thunk for User Register
export const registerUser = createAsyncThunk<
  USER,
  { name: string; email: string; password: string },
  { rejectValue: { message: string } }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    localStorage.setItem('userToken', response.data.token);
    return response.data.user;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<RegisterError>;
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(axiosError.response.data);
    }
    return rejectWithValue({ message: 'Unknown error occurred' });
  }
});
