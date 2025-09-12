import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import adminReducer from './slices/adminSlice';
import adminProductReducer from './slices/adminProductSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    admin: adminReducer,
    adminProduct: adminProductReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
