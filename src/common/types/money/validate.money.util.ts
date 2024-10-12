import { BadRequestException } from "@nestjs/common";
import { createMoney, DEFAULT_CURRENCY, MoneyType } from "./money.type";
import { validCurrenciesConst } from "./valid.currencies.const";

export function validateMoney(
  amount: number,
  currency: string = DEFAULT_CURRENCY
): MoneyType {
  // Check if the amount is a finite, non-negative number
  if (!Number.isFinite(amount) || amount < 0) {
    throw new BadRequestException(
      `Invalid amount. It must be a non-negative, finite number: ${amount}`
    );
  }

  // Validate the currency code (assuming isValidCurrency is a utility function)
  if (!isValidCurrency(currency)) {
    throw new BadRequestException(`Invalid currency code: ${currency}`);
  }

  // Further validation logic could be added here if needed

  // Return the validated MoneyType object
  return createMoney(amount, currency);
}

export function isValidCurrency(currency: string): boolean {
  return validCurrenciesConst.includes(currency);
}
