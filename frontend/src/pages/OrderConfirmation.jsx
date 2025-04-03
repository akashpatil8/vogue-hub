import { useLocation } from "react-router-dom";

import { getDeliveryDate } from "../utils/helper";
import orderConfirmationImage from "../../public/assets/order-confirm.jpg";

export default function OrderConfirmation() {
  const {
    state: { orderId, totalPrice },
  } = useLocation();

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-semibold">Order Confirmation</h1>
      <p className="mt-4 text-gray-600">
        Thank you for your order! Your order has been successfully placed.
      </p>
      <img
        src={orderConfirmationImage}
        alt="Order Confirmation"
        className="mx-auto mt-4 h-56 w-56 max-w-md bg-red-400 object-cover"
      />
      <p className="mt-2 text-gray-600">
        Order Number: <strong>{orderId}</strong>
      </p>
      <p className="mt-2 text-gray-600">
        Estimated Delivery Date: <strong>{getDeliveryDate(9)}</strong>
      </p>
      <p className="mt-2 text-gray-600">
        Total Amount: <strong>{totalPrice}</strong>
      </p>
      <p className="mt-2 text-gray-600">Thank you for shopping with us!</p>
    </main>
  );
}
