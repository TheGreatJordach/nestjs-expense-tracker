import { PasswordProvider } from "./password.provider";
import { BcryptAlgorithmProvider } from "./hash/bcrypt.algorithm.provider";
import { Test, TestingModule } from "@nestjs/testing";

/***
 * To enhance the unit tests for the PasswordProvider class,
 * we can add more test cases to cover edge cases and various scenarios.
 * Here Test cases:
 *
 * Hashing an empty password.
 * Hashing a password that contains special characters.
 * Comparing passwords when the compare method throws an error.
 * Comparing passwords when the user password is empty.
 * Comparing passwords with a stored password that is an empty string.
 *
 ***/

describe("PasswordProvider", () => {
  let passwordProvider: PasswordProvider;
  let bcryptAlgorithm: BcryptAlgorithmProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordProvider,
        {
          provide: BcryptAlgorithmProvider,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    passwordProvider = module.get<PasswordProvider>(PasswordProvider);
    bcryptAlgorithm = module.get<BcryptAlgorithmProvider>(
      BcryptAlgorithmProvider
    );
  });

  describe("hashPassword", () => {
    it("should hash the password", async () => {
      const password = "mySecretPassword";
      const hashedPassword = "hashedPassword";

      (bcryptAlgorithm.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordProvider.hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcryptAlgorithm.hash).toHaveBeenCalledWith(password);
    });

    it("should hash an empty password", async () => {
      const password = "";
      const hashedPassword = "hashedEmptyPassword";

      (bcryptAlgorithm.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordProvider.hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcryptAlgorithm.hash).toHaveBeenCalledWith(password);
    });

    it("should hash a password with special characters", async () => {
      const password = "p@ssw0rd!$";
      const hashedPassword = "hashedSpecialChars";

      (bcryptAlgorithm.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordProvider.hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcryptAlgorithm.hash).toHaveBeenCalledWith(password);
    });
  });

  describe("comparePassword", () => {
    it("should return true if passwords match", async () => {
      const userPassword = "mySecretPassword";
      const storedPassword = "hashedPassword";

      (bcryptAlgorithm.compare as jest.Mock).mockResolvedValue(true);

      const result = await passwordProvider.comparePassword(
        userPassword,
        storedPassword
      );

      expect(result).toBe(true);
      expect(bcryptAlgorithm.compare).toHaveBeenCalledWith(
        userPassword,
        storedPassword
      );
    });

    it("should return false if passwords do not match", async () => {
      const userPassword = "mySecretPassword";
      const storedPassword = "hashedPassword";

      (bcryptAlgorithm.compare as jest.Mock).mockResolvedValue(false);

      const result = await passwordProvider.comparePassword(
        userPassword,
        storedPassword
      );

      expect(result).toBe(false);
      expect(bcryptAlgorithm.compare).toHaveBeenCalledWith(
        userPassword,
        storedPassword
      );
    });

    it("should return false if the user password is empty", async () => {
      const userPassword = "";
      const storedPassword = "hashedPassword";

      (bcryptAlgorithm.compare as jest.Mock).mockResolvedValue(false);

      const result = await passwordProvider.comparePassword(
        userPassword,
        storedPassword
      );

      expect(result).toBe(false);
      expect(bcryptAlgorithm.compare).toHaveBeenCalledWith(
        userPassword,
        storedPassword
      );
    });

    it("should return false if stored password is an empty string", async () => {
      const userPassword = "mySecretPassword";
      const storedPassword = "";

      (bcryptAlgorithm.compare as jest.Mock).mockResolvedValue(false);

      const result = await passwordProvider.comparePassword(
        userPassword,
        storedPassword
      );

      expect(result).toBe(false);
      expect(bcryptAlgorithm.compare).toHaveBeenCalledWith(
        userPassword,
        storedPassword
      );
    });

    it("should throw an error if bcryptAlgorithm.compare throws", async () => {
      const userPassword = "mySecretPassword";
      const storedPassword = "hashedPassword";

      (bcryptAlgorithm.compare as jest.Mock).mockRejectedValue(
        new Error("Comparison error")
      );

      await expect(
        passwordProvider.comparePassword(userPassword, storedPassword)
      ).rejects.toThrow("Comparison error");
    });
  });
});
