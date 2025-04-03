import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./components/checkout/Cart";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import store from "./redux/store";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Settings from "./pages/Settings";
import AppLayout from "./components/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Address from "./components/checkout/Address";
import Payment from "./components/checkout/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="account" element={<Account />} />
            <Route path="checkout" element={<Checkout />}>
              <Route index element={<Navigate to="cart" replace />} />
              <Route path="cart" element={<Cart />} />
              <Route path="address" element={<Address />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="order/confirmation" element={<OrderConfirmation />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 4000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "#595959",
          },
        }}
      />
    </Provider>
  );
}
