import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
  products: null,
  isProductsLoading: false,
  productsError: null,
};

export const productsData = createAsyncThunk(
  "products/productsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "/products", {
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error(response);

      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsData.pending, (state) => {
        (state.isProductsLoading = true), (state.productsError = null);
      })
      .addCase(productsData.fulfilled, (state, action) => {
        (state.isProductsLoading = false), (state.products = action.payload);
      })
      .addCase(productsData.rejected, (state, action) => {
        (state.isProductsLoading = false),
          (state.productsError = action.payload);
      });
  },
});

export default productSlice.reducer;
