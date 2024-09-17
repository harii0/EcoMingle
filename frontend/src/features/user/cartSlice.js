import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addcart, getCart, removeCart } from './api/cartApi';
const initialState = {
  items: [],
  status: '',
  loading: false,
  error: false,
};

export const getFromCart = createAsyncThunk(
  'cart/getFromCart',
  async ({ rejectWithValue }) => {
    try {
      const response = await getCart();
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data, { rejectWithValue }) => {
    try {
      const response = await addcart(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeFromCart = createAsyncThunk(
  'cart/removeCart',
  async (data, { rejectWithValue }) => {
    try {
      const response = await removeCart(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFromCart.fulfilled, (state, action) => {
      state.items = action.payload;
      console.log(action.payload);
    });
    builder.addCase(addToCart.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload.data.cart.items.map((item) => ({
        ...item,
        productItem: item.productItem
          ? {
              ...item.productItem,
              productImage:
                item.productItem.ProductImage ||
                item.productItem.productImage ||
                [],
            }
          : null,
      }));
      state.loading = false;
      state.error = false;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.status = 'failed';
      state.error = true;
      state.loading = false;
    });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + (item.productItem ? item.productItem.price * item.quantity : 0),
    0,
  );
