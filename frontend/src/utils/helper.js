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

// Form validations

export const firstNameValidation = {
  required: "Name is required.",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters.",
  },
  maxLength: {
    value: 50,
    message: "Name must be at most 50 characters.",
  },
  validate: (value) =>
    /^[A-Za-z\s]+$/.test(value) || "Name should contain only letters.",
};

export const lastNameValidation = {
  validate: (value) =>
    value === "" ||
    /^[A-Za-z\s]+$/.test(value) ||
    "Name should contain only letters.",
};

export const emailValidation = {
  required: "Email is required.",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address.",
  },
};

export const mobileValidate = {
  required: "Mobile number is required.",
  validate: (value) => {
    const trimmed = value.trim();
    const normalized = trimmed.replace(/^(\+91|0)/, "");

    if (!/^\d+$/.test(normalized)) {
      return "Mobile number not valid";
    }

    if (normalized.length !== 10) {
      return "Mobile number must be 10 digits";
    }

    return true;
  },
};

export const passwordValidation = {
  required: "Password is required.",
  minLength: {
    value: 5,
    message: "Password must be at least 5 characters.",
  },
  maxLength: {
    value: 20,
    message: "Password must be at most 20 characters.",
  },
};
