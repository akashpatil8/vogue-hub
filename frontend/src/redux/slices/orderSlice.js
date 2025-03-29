import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
  orders: [],
  isOdersLoading: false,
  isOrdersError: null,
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "/orders", {
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error(response);

      return response.data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const {
        name,
        mobile,
        shippingAddress,
        paymentStatus,
        totalPrice,
        orderItems,
      } = orderData;

      const response = await axios.post(
        BASE_URL + "/orders",
        {
          name,
          mobile,
          shippingAddress,
          paymentStatus,
          totalPrice,
          orderItems,
        },
        { withCredentials: true },
      );

      if (response.status !== 200) throw new Error(response);

      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isOdersLoading = true;
        state.isOrdersError = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOdersLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOdersLoading = false;
        state.isOrdersError = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.isOdersLoading = true;
        state.isOrdersError = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isOdersLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isOdersLoading = false;
        state.isOrdersError = action.payload;
      });
  },
});

export default orderSlice.reducer;
