export const formatCurrency = (currency?: string, price?: any) => {
  let finalCurrency = currency ?? "dolar";
  let finalPrice = price ?? "999999";

  switch (finalCurrency) {
    case "dolar":
      finalPrice = `$${price} USD`;
      break;
    case "real":
      finalPrice = `$${price} BRL`;
      break;
    default:
      finalPrice = `$${price} USD`;
      break;
  }

  return finalPrice;
};
