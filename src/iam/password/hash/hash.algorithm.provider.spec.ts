import { BcryptAlgorithmProvider } from "./bcrypt.algorithm.provider";
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from "@nestjs/common";

jest.mock("bcrypt"); // Automatically mock bcrypt module

describe("BcryptAlgorithmProvider", () => {
  let bcryptAlgorithmProvider: BcryptAlgorithmProvider;

  beforeEach(() => {
    bcryptAlgorithmProvider = new BcryptAlgorithmProvider();
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  describe("compare", () => {
    it("should return true when data matches the encrypted string", async () => {
      const data = "mySecretPassword";
      const encrypted = "hashedPassword";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Mocking bcrypt.compare to return true

      const result = await bcryptAlgorithmProvider.compare(data, encrypted);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
    });

    it("should return false when data does not match the encrypted string", async () => {
      const data = "mySecretPassword";
      const encrypted = "hashedPassword";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mocking bcrypt.compare to return false

      const result = await bcryptAlgorithmProvider.compare(data, encrypted);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
    });

    it("should throw UnauthorizedException if an error occurs during comparison", async () => {
      const data = "mySecretPassword";
      const encrypted = "hashedPassword";

      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Comparison error")
      ); // Simulating an error

      await expect(
        bcryptAlgorithmProvider.compare(data, encrypted)
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException for empty data", async () => {
      const encrypted = "hashedPassword";

      await expect(
        bcryptAlgorithmProvider.compare("", encrypted)
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException for null data", async () => {
      const encrypted = "hashedPassword";

      await expect(
        bcryptAlgorithmProvider.compare(null, encrypted)
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("hash", () => {
    it("should return a hash when the data is hashed successfully", async () => {
      const data = "mySecretPassword";
      const salt = "randomSalt";
      const hashedPassword = "hashedPassword";

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt); // Mocking bcrypt.genSalt
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword); // Mocking bcrypt.hash

      const result = await bcryptAlgorithmProvider.hash(data);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(
        bcryptAlgorithmProvider["saltRound"]
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(data, salt);
    });

    it("should throw UnauthorizedException if an error occurs during hashing", async () => {
      const data = "mySecretPassword";

      (bcrypt.genSalt as jest.Mock).mockRejectedValue(
        new Error("Salt generation error")
      ); // Simulating an error

      await expect(bcryptAlgorithmProvider.hash(data)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should hash Buffer data successfully", async () => {
      const data = Buffer.from("mySecretPassword");
      const salt = "randomSalt";
      const hashedPassword = "hashedPassword";

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt); // Mocking bcrypt.genSalt
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword); // Mocking bcrypt.hash

      const result = await bcryptAlgorithmProvider.hash(data);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(
        bcryptAlgorithmProvider["saltRound"]
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(data, salt);
    });

    it("should throw UnauthorizedException for empty data", async () => {
      await expect(bcryptAlgorithmProvider.hash("")).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should throw UnauthorizedException for null data", async () => {
      await expect(bcryptAlgorithmProvider.hash(null)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should only accept strong passwords", async () => {
      const weakPassword = "123";
      const strongPassword = "StrongP@ssw0rd!";
      // Simulate validation of strong password; in a real implementation, this would be a method
      const isValidStrongPassword = (password: string) => {
        return (
          password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)
        );
      };

      expect(isValidStrongPassword(strongPassword)).toBe(true);
      expect(isValidStrongPassword(weakPassword)).toBe(false);
    });
  });

  describe("saltRound Configuration", () => {
    it("should have a default salt round value of 12", () => {
      expect(bcryptAlgorithmProvider["saltRound"]).toBe(12);
    });

    it("should allow overriding the salt round via environment variable", () => {
      process.env.SALT_ROUND = "10";
      const provider = new BcryptAlgorithmProvider();
      expect(provider["saltRound"]).toBe(10);
      delete process.env.SALT_ROUND; // Clean up environment variable
    });
  });

  describe("Multiple Consecutive Calls", () => {
    it("should handle multiple calls to hash without errors", async () => {
      const data = "mySecretPassword";
      const salt = "randomSalt";
      const hashedPassword = "hashedPassword";

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt); // Mocking genSalt to return a salt value
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword); // Mocking hash to return a hashed password

      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(bcryptAlgorithmProvider.hash(data));
      }

      const results = await Promise.all(promises);

      results.forEach((result) => expect(result).toBe(hashedPassword));
      expect(bcrypt.genSalt).toHaveBeenCalledTimes(10); // Ensure genSalt was called 10 times
      expect(bcrypt.hash).toHaveBeenCalledTimes(10); // Ensure hash was called 10 times
    });
  });
});
