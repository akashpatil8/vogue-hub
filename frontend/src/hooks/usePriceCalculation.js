export function usePriceCalculation(bagItems) {
  const bagLength = bagItems?.length;
  const shipping = 5 * bagLength;
  const subtotal = bagItems?.reduce((acc, curr) => {
    if (curr.discountedPrice > 0) {
      return acc + curr.discountedPrice;
    }
    //   return acc + curr.quantity * curr.discountedPrice;
    // return acc + curr.quantity * curr.price;
    return acc + curr.price;
  }, 0);

  const tax = Math.round(subtotal * 0.12);
  const total = shipping + tax + subtotal;

  return { total, bagLength, shipping, subtotal, tax };
}
