export function usePriceCalculation(bagItems) {
  const bagLength = bagItems?.length;
  const shipping = 5 * bagLength;
  const subtotal = bagItems?.reduce((acc, curr) => {
    if (curr.discountedPrice > 0) {
      return acc + curr.discountedPrice;
    }

    return acc + curr.price;
  }, 0);

  const tax = Math.round(subtotal * 0.12);
  const unRoundedTotal = shipping + tax + subtotal;
  const total = unRoundedTotal.toFixed(2);

  return { total, bagLength, shipping, subtotal, tax };
}
