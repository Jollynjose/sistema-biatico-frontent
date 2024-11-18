export const getFuelGallons = (distance: number) => {
  return distance / 30;
};

/**
 *
 * @param fuelPrice number
 * @param distance number Kilometers
 * @returns Price of the fuel calculated
 */
export const getFuelCalculated = (
  fuelPrice: number,
  distance: number,
): number => {
  const gallons = getFuelGallons(distance);

  const totalPrice = gallons * fuelPrice;

  const decimalPart = totalPrice % 1;

  if (decimalPart > 0.6) {
    return Math.ceil(totalPrice);
  }

  return totalPrice;
};
