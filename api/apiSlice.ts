import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pixabay.com/api/',
  }),
  endpoints: (builder) => ({
    fetchImages: builder.query<any, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '',
        params: {
          key: '47103362-a5146a99fdb2ff917ad591bac',
          q: query,
          page,
        },
      }),
    }),
    fetchVideos: builder.query<any, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: 'videos/',
        params: {
          key: '47103362-a5146a99fdb2ff917ad591bac',
          q: query,
          page,
        },
      }),
    }),
  }),
});

export const { useFetchImagesQuery, useFetchVideosQuery } = apiSlice;
