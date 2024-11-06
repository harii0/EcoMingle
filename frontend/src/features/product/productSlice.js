import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from './api';

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  helperText: '',
  loading: false,
};

export const getProductsThunk = createAsyncThunk(
  'product/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response.data.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getProductByCategory = createAsyncThunk(
  'product/getProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await getProductsByCategory(category);
      return response.data.data.products;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getProductThunk = createAsyncThunk(
  'product/getProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createProductThunk = createAsyncThunk(
  'product/createProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateProductThunk = createAsyncThunk(
  'product/updateProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateProduct(data.id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProductThunk = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
        state.loading = false;
        state.helperText = action.payload?.message;
        state.error = false;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.helperText = action.payload?.message || 'Something went wrong';
      })
      .addCase(getProductThunk.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.selectedProduct = action.payload;
        state.loading = false;
        state.helperText = action.payload?.message;
        state.error = false;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.helperText = action.payload?.message || 'Something went wrong';
      })
      .addCase(createProductThunk.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = [...state.products, action.payload];
        state.loading = false;
        state.helperText = action.payload?.message;
        state.error = false;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.helperText = action.payload?.message || 'Something went wrong';
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        );
        state.loading = false;
        state.helperText = action.payload?.message;
        state.error = false;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.helperText = action.payload?.message || 'Something went wrong';
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id,
        );
        state.loading = false;
        state.helperText = action.payload?.message;
        state.error = false;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
        state.helperText = action.payload?.message || 'Something went wrong';
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
        state.loading = false;
        state.helperText = action.payload?.message;
        state.error = false;
      });
  },
});

export default productSlice;
