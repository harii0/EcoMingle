import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addcart, getCart, removeCart } from './api/cartApi';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  status: '',
  loading: false,
  error: false,
  checkoutItems: [],
};

export const getFromCart = createAsyncThunk(
  'cart/getFromCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
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
export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async (data, { rejectWithValue }) => {
    try {
      const response = await addcart(data);
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (data, { rejectWithValue }) => {
    try {
      const response = await removeCart(data);
      localStorage.removeItem('cartItems');
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
      localStorage.removeItem('cartItems');
    },
    setCheckoutItems: (state, action) => {
      console.log(action.payload);
      state.checkoutItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFromCart.fulfilled, (state, action) => {
      state.items = action.payload.data.cart?.items?.map((item) => ({
        ...item,
        productItem:
          item.productItem && typeof item.productItem === 'string'
            ? item.productItem // If it's a string, assign it directly
            : {
                ...item.productItem, // Handle object case if needed
                productImage:
                  item.productItem.productImage || item.productImage || [],
              },
      }));
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    });
    builder.addCase(addToCart.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload.data.cart.items.map((item) => ({
        ...item,
        productItem:
          item.productItem && typeof item.productItem === 'string'
            ? item.productItem // If it's a string, assign it directly
            : {
                ...item.productItem, // Handle object case if needed
                productImage:
                  item.productItem.productImage || item.productImage || [],
              },
      }));
      state.loading = false;
      state.error = false;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.status = 'failed';
      state.error = true;
      state.loading = false;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.items = action.payload.data.updatedUser.cart;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    });
    builder
      .addCase(updateQuantity.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload.data.cart.items.map((item) => ({
          ...item,
          productItem:
            item.productItem && typeof item.productItem === 'string'
              ? item.productItem // If it's a string, assign it directly
              : {
                  ...item.productItem, // Handle object case if needed
                  productImage:
                    item.productItem.productImage || item.productImage || [],
                },
        }));
        state.loading = false;
        state.error = false;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      })
      .addCase(updateQuantity.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
        state.loading = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const { setCheckoutItems } = cartSlice.actions;

export default cartSlice;

export const selectCartItems = (state) => state.cart?.items;
export const selectCheckoutItems = (state) => state.cart?.checkoutItems;
export const selectCartTotal = (state) =>
  state.cart.items?.reduce(
    (total, item) =>
      total + (item.productItem ? item.price * item.quantity : 0),
    0,
  );
