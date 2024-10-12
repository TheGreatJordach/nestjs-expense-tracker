// Define a unique brand for the Money type
export type MoneyType = {
  amount: number; // Store as an integer representing minor units (e.g., cents)
  currency: string;
} & { readonly brand: unique symbol };

// Define a currency constant
export const DEFAULT_CURRENCY = "USD";

// Utility function to create Money
export function createMoney(
  amount: number,
  currency: string = DEFAULT_CURRENCY
): MoneyType {
  const minorUnits = Math.round(amount * 100); // Store amount in cents
  return { amount: minorUnits, currency } as MoneyType; // Cast to MoneyType
}
