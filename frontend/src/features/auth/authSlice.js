import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register } from './api';

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  helperText: '',
  loading: false,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      console.log('response', response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload?.data;
        state.isAuthenticated = true;
        state.loading = false;
        state.helperText = '' || action.payload?.message;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.helperText = action.payload?.message || 'Something went wrong';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice;
