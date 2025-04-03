export const getDiscount = (price, discountedPrice) =>
  Math.round(((price - discountedPrice) / price) * 100);

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
    } else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    }
  });
};

export const getDeliveryDate = (daysAhead) => {
  const today = new Date();
  today.setDate(today.getDate() + daysAhead);

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};
