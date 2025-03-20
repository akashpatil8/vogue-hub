import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
  cart: [],
  isCartLoading: false,
  cartError: null,
  loadingCartProducts: {},
};

export const cartThunk = createAsyncThunk(
  "products/cart",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error(response);

      return response?.data?.cart;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async ({ productId }, { rejectedWithValue }) => {
    try {
      const res = await axios.post(
        BASE_URL + "/cart/" + productId,
        {},
        { withCredentials: true },
      );

      if (res.status !== 200) throw new Error(res);

      return res.data?.product; // Return the product data
    } catch (error) {
      return rejectedWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "products/removeFromCart",
  async ({ productId }, { rejectedWithValue }) => {
    try {
      const res = await axios.delete(BASE_URL + "/cart/" + productId, {
        withCredentials: true,
      });

      if (res.status !== 200) throw new Error(res);

      return productId;
    } catch (error) {
      return rejectedWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartThunk.pending, (state) => {
        (state.isCartLoading = true), (state.cartError = false);
      })
      .addCase(cartThunk.fulfilled, (state, action) => {
        (state.isCartLoading = false), (state.cart = action.payload);
      })
      .addCase(cartThunk.rejected, (state, action) => {
        (state.isCartLoading = false), (state.cartError = action.payload);
      })
      .addCase(addToCart.pending, (state, action) => {
        state.loadingCartProducts[action.meta.arg.productId] = true;
        state.cartError = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartError = null;
        state.cart = [...state.cart, action.payload]; // Add the product to the cart
        delete state.loadingCartProducts[action.meta.arg.productId]; // Remove loading state
      })
      .addCase(addToCart.rejected, (state, action) => {
        delete state.loadingCartProducts[action.meta.arg.productId];
        state.cartError = action.payload;
      })
      .addCase(removeFromCart.pending, (state, action) => {
        state.loadingCartProducts[action.meta.arg.productId] = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        delete state.loadingCartProducts[action.meta.arg.productId];
        state.cart = state.cart.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        delete state.loadingCartProducts[action.meta.arg.productId];
        state.cartError = action.payload;
      });
  },
});

export default cartSlice.reducer;
