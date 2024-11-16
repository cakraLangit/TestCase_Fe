import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipe untuk state autentikasi
interface AuthState {
  token: string | null; 
  isAuthenticated: boolean; 
}

// State awal
const initialState: AuthState = {
  token: null, 
  isAuthenticated: false, 
};

// Slice autentikasi
const authSlice = createSlice({
  name: 'auth', // Nama slice
  initialState,
  reducers: {
    // Action untuk login
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload; 
      state.isAuthenticated = true; 
      AsyncStorage.setItem('token', action.payload); 
    },
    // Action untuk logout
    logout: (state) => {
      state.token = null; 
      state.isAuthenticated = false; 
      AsyncStorage.removeItem('token'); 
    },
    // Action untuk memulihkan token dari AsyncStorage
    restoreToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload; 
      state.isAuthenticated = !!action.payload; 
    },
  },
});

// Ekspor actions dan reducer
export const { setCredentials, logout, restoreToken } = authSlice.actions;
export default authSlice.reducer;
