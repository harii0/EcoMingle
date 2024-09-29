import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register } from './api';
import { getFromCart } from '../user/cartSlice';
import TokenService from '../../services/auth.service';

const initialState = {
  user: TokenService.getUser('user') || null,
  isAuthenticated: TokenService.getUser('user') || false,
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
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(data);
      TokenService.setUser(response?.data);
      dispatch(getFromCart());
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
      TokenService.removeUser('user');
      TokenService.removeUser('cartItems');
    } catch (error) {
      TokenService.removeUser('user');
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
        state.helperText = action.payload?.message;
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
