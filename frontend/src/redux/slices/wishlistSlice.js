import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
  wishlist: null,
  isWishlistLoading: false,
  wishlistError: null,
  loadingWishlistProducts: {},
};

export const wishlistThunk = createAsyncThunk(
  "products/wishlistThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL + "/wishlist", {
        withCredentials: true,
      });

      if (res.status !== 200) throw new Error(res);

      return res.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "products/addToWhistlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        BASE_URL + "/wishlist/" + productId,
        {},
        { withCredentials: true },
      );

      if (res.status !== 200) throw new Error(res);

      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const removeFromWislist = createAsyncThunk(
  "products/removeFromWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(BASE_URL + "/wishlist/" + productId, {
        withCredentials: true,
      });
      if (res.status !== 200) throw new Error(res);

      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wishlistThunk.pending, (state) => {
        (state.isWishlistLoading = true), (state.wishlistError = false);
      })
      .addCase(wishlistThunk.fulfilled, (state, action) => {
        (state.wishlist = action.payload), (state.isWishlistLoading = false);
      })
      .addCase(wishlistThunk.rejected, (state, action) => {
        (state.isWishlistLoading = false),
          (state.wishlistError = action.payload);
      })
      .addCase(addToWishlist.pending, (state, action) => {
        (state.loadingWishlistProducts[action.payload] = true),
          (state.wishlistError = null);
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loadingWishlistProducts[action.payload] = false;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        (state.loadingWishlistProducts[action.payload] = false),
          (state.wishlistError = action.payload);
      })
      .addCase(removeFromWislist.pending, (state, action) => {
        (state.loadingWishlistProducts[action.payload] = true),
          (state.wishlistError = null);
      })
      .addCase(removeFromWislist.fulfilled, (state, action) => {
        (state.loadingWishlistProducts[action.payload] = false),
          (state.wishlist = state.wishlist.filter(
            (item) => item._id !== action.payload,
          ));
      })
      .addCase(removeFromWislist.rejected, (state, action) => {
        (state.loadingWishlistProducts[action.payload] = false),
          (state.wishlistError = action.payload);
      });
  },
});

export default wishlistSlice.reducer;
