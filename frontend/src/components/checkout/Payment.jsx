import axios from "axios";
import toast from "react-hot-toast";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utils/constants";
import { loadRazorpayScript } from "../../utils/helper";

export default function Payment() {
  const { ordersCreated } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  const order = ordersCreated[ordersCreated.length - 1];

  const handelOrderSave = async (response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    try {
      const res = await axios.post(
        BASE_URL + "/orders/save",
        {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          notes: order?.notes,
        },
        { withCredentials: true },
      );

      if (res.status === 200) {
        toast.success("Payment Successful");
        navigate("/order/confirmation", {
          state: {
            orderId: razorpay_order_id,
            totalPrice: order?.notes?.totalPrice,
          },
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelPayments = async () => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        console.error("Failed to load Razorpay SDK");
        return;
      }

      const options = {
        key: import.meta.env.VITE_TEST_KEY_ID,
        amount: order?.amount,
        currency: order?.currency,
        name: "VogueHub",
        description: "Test Transaction",
        order_id: order?.id,
        handler: (response) => {
          // Handle successful payment here
          handelOrderSave(response);
        },
        prefill: {
          name: "Akash Patil",
          email: "akash@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handelPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
