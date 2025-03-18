import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
