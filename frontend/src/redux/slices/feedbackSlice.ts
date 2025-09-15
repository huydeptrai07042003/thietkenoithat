import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

interface feedBacks {
  _id: string;
  user: string;
  rate: number;
  description: string;
  approved: boolean;
}

interface INITIALSTATE {
  feedbacks: feedBacks[];
  loading: boolean;
  error: string | null;
}

const initialState: INITIALSTATE = {
  feedbacks: [],
  loading: false,
  error: null,
};

//Thunk to fetch feedBacks
export const fetchFeedbacks = createAsyncThunk<feedBacks[]>('feedbacks/fetchFeedbacks', async () => {
  const response = await axios.get(`${API_URL}/api/feedbacks`);
  return response.data;
});

//Thunk to create feedBacks
export const createFeedbacks = createAsyncThunk<feedBacks, Partial<feedBacks>>(
  'feedbacks/createFeedbacks',
  async (newFeedback) => {
    const response = await axios.post(`${API_URL}/api/feedbacks`,newFeedback);
    return response.data;
  },
);

//Thunk to update status feedBacks
export const updateFeedbacks = createAsyncThunk<feedBacks, { id: string; newFeedback: Partial<feedBacks> }>(
  'feedbacks/updateFeedbacks',
  async ({ id, newFeedback }) => {
    const token = `Bearer ${localStorage.getItem('userToken')}`;
    const response = await axios.put(`${API_URL}/api/feedbacks/${id}`, newFeedback, {
      headers: { Authorization: token },
    });
    return response.data;
  },
);

//Thunk to delete feedBacks
export const deleteFeedbacks = createAsyncThunk<string, string>('feedbacks/deleteFeedbacks', async (id) => {
  const token = `Bearer ${localStorage.getItem('userToken')}`;
  await axios.delete(`${API_URL}/api/feedbacks/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return id;
});

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch feedback';
      })
      .addCase(createFeedbacks.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })
      .addCase(updateFeedbacks.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex((feedback) => feedback._id === action.payload._id);
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(deleteFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter((feedback) => feedback._id !== action.payload);
      });
  },
});

export default feedbackSlice.reducer;
