import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TokenService from '../../services/auth.service';
import { vendorLogin, vendorRegister } from './api/api';

const initialState = {
  vendor: TokenService.getUser('vendor') || null,
};

export const registerVendor = createAsyncThunk(
  'vendor/registerVendpr',
  async (data, { rejectWithValue }) => {
    try {
      const response = await vendorRegister(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const loginVendor = createAsyncThunk(
  'vendor/loginVendor',
  async (data, { rejectWithValue }) => {
    try {
      const response = await vendorLogin(data);
      console.log(response);
      TokenService.setVendor(response?.data);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  },
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
});

export default vendorSlice;
