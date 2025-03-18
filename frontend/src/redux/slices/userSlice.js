import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: savedUser,
  isUserLoading: false,
  userError: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true },
      );

      if (response.status !== 200) throw new Error(response);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );

      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.isUserLoading = true), (state.userError = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.user = action.payload), (state.isUserLoading = false);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isUserLoading = false), (state.userError = action.payload);
      })
      .addCase(logoutUser.pending, (state) => {
        (state.isUserLoading = false), (state.userError = null);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        (state.isUserLoading = false), (state.user = null);
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        (state.isUserLoading = false), (state.userError = action.payload);
      });
  },
});

export default userSlice.reducer;
