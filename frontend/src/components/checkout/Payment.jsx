import axios from "axios";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utils/constants";
import { loadRazorpayScript } from "../../utils/helper";

export default function Payment() {
  const [isPaymentVerifying, setIsPaymentVerifying] = useState(false);
  const { ordersCreated } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  const order = ordersCreated[ordersCreated.length - 1];

  const checkPaymentStatus = async (orderId, retries = 10) => {
    let attempt = 0;
    setIsPaymentVerifying(true);

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/orders/payment-status/${orderId}`,
        );

        if (res.status === 200) {
          toast.success("Payment Successful!");
          clearInterval(interval);
          setIsPaymentVerifying(false);
          navigate("/order/confirmation", {
            state: {
              orderId,
              totalPrice: order?.notes?.totalPrice,
            },
          });
        }
      } catch (error) {
        if (attempt >= retries) {
          setIsPaymentVerifying(false);
          toast.error("Payment not confirmed. Please contact support.");
          clearInterval(interval);
          navigate("/");
        }
      }

      attempt++;
    }, 3000); // every 3 seconds
  };

  // const handelOrderSave = async (response) => {
  //   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //     response;

  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/orders/save",
  //       {
  //         orderId: razorpay_order_id,
  //         paymentId: razorpay_payment_id,
  //         signature: razorpay_signature,
  //         notes: order?.notes,
  //       },
  //       { withCredentials: true },
  //     );

  //     if (res.status === 200) {
  //       toast.success("Payment Successful");
  //       navigate("/order/confirmation", {
  //         state: {
  //           orderId: razorpay_order_id,
  //           totalPrice: order?.notes?.totalPrice,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handelPayments = async () => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        console.error("Failed to load Razorpay SDK");
        return;
      }

      const options = {
        key: "rzp_test_x0fJr13Cv7IjSn",
        amount: order?.amount,
        currency: order?.currency,
        name: "VogueHub",
        description: "Test Transaction",
        order_id: order?.id,
        handler: (response) => {
          // Handle successful payment here
          checkPaymentStatus(response.razorpay_order_id);
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

  return (
    <>
      {isPaymentVerifying ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="loader mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-700">
              Verifying Payment...
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
