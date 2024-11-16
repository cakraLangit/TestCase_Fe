import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import bookmarkReducer from './bookmarkSlice';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmark: bookmarkReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
