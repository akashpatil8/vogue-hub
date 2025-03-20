export const getDiscount = (price, discountedPrice) =>
  Math.round(((price - discountedPrice) / price) * 100);
