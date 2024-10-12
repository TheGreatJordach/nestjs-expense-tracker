import { BadRequestException } from "@nestjs/common";
import { DEFAULT_CURRENCY, MoneyType } from "./money.type";
import { createMoney } from "./money.type";
import { validateMoney } from "./validate.money.util"; // Ensure the correct path for imports

jest.mock("./money.type", () => ({
  ...jest.requireActual("./money.type"),
  createMoney: jest.fn(),
}));

describe("validateMoney", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw BadRequestException if the amount is negative", () => {
    const amount = -100;
    const currency = "USD";

    expect(() => validateMoney(amount, currency)).toThrow(BadRequestException);
    expect(() => validateMoney(amount, currency)).toThrow(
      "Invalid amount. It must be a non-negative, finite number: -100"
    );
  });

  it("should throw BadRequestException if the amount is not a finite number", () => {
    const amount = Infinity;
    const currency = "USD";

    expect(() => validateMoney(amount, currency)).toThrow(BadRequestException);
    expect(() => validateMoney(amount, currency)).toThrow(
      "Invalid amount. It must be a non-negative, finite number: Infinity"
    );
  });

  it("should throw BadRequestException if the currency is invalid", () => {
    const amount = 100;
    const invalidCurrency = "XYZ";

    expect(() => validateMoney(amount, invalidCurrency)).toThrow(
      BadRequestException
    );
    expect(() => validateMoney(amount, invalidCurrency)).toThrow(
      "Invalid currency code: XYZ"
    );
  });

  it("should return a valid MoneyType when amount and currency are correct", () => {
    const amount = 100;
    const currency = "USD";

    // Mock the createMoney function to return a mock MoneyType object
    const mockMoney: MoneyType = {
      amount: amount * 100,
      currency,
      brand: Symbol("money-brand") as MoneyType["brand"], // Use type assertion to satisfy unique symbol
    };

    (createMoney as jest.Mock).mockReturnValue(mockMoney);

    const result = validateMoney(amount, currency);

    expect(result).toEqual(mockMoney);
    expect(createMoney).toHaveBeenCalledWith(amount, currency);
  });

  it("should default to DEFAULT_CURRENCY if no currency is provided", () => {
    const amount = 100;
    const currency = "USD";

    const mockMoney: MoneyType = {
      amount: amount * 100,
      currency,
      brand: Symbol("money-brand") as MoneyType["brand"], // Use type assertion to satisfy unique symbol
    };

    (createMoney as jest.Mock).mockReturnValue(mockMoney);

    const result = validateMoney(amount);

    expect(result).toEqual(mockMoney);
    expect(createMoney).toHaveBeenCalledWith(amount, DEFAULT_CURRENCY);
  });
});
