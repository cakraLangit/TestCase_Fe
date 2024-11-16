import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarkState {
  images: any[];
}

const initialState: BookmarkState = {
  images: [], // Awalnya kosong
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addImageBookmark: (state, action: PayloadAction<any>) => {
      state.images.push(action.payload);
    },
    removeImageBookmark: (state, action: PayloadAction<number>) => {
      state.images = state.images.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addImageBookmark, removeImageBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
