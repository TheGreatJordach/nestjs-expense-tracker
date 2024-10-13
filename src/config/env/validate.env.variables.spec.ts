import { InternalServerErrorException } from "@nestjs/common";
import { ValidateEnvVariables } from "./validate.env.variables";

// Adjust the import path as necessary
/**
 * To enhance the test suite for your environment variable validation,
 * especially focusing on security aspects, I added tests that ensure the following:
 *
 * 1. Preventing injection attacks: Validate that inputs do not allow for harmful content (e.g., SQL injection strings).
 * 2. Strong Password Enforcement: Check if the password meets specific criteria (e.g., minimum length, complexity).
 * 3. Environment Variable Length: Validate that the environment variables do not exceed expected lengths to mitigate buffer overflow attacks.
 * 4. Strict Type Validation: Ensure that environment variables are strictly of the expected type to prevent type coercion vulnerabilities.
 * **/
describe("EnvValidation", () => {
  it("should validate environment variables successfully with valid input", () => {
    const validEnv = {
      DATASOURCE_USERNAME: "user",
      DATASOURCE_PASSWORD: "Password@@2024",
      DATASOURCE_DATABASE: "database",
      DATASOURCE_HOST: "localhost",
      DATASOURCE_PORT: 5432,
      SALT_ROUND: 10,
      APP_PORT: 3000,
      APP_PREFIX: "api",
      NODE_ENV: "development",
      SWAGGER_PATH: "swagger",
      SWAGGER_DESC: "API Documentation",
      SWAGGER_TITLE: "API Title",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_LICENCE_URL: "http://license.url",
      SWAGGER_SERV: "https://api.example.com",
      SWAGGER_VERSION: "1.0.0",
    };

    const result = ValidateEnvVariables.EnvValidation(validEnv);

    expect(result).toBeInstanceOf(ValidateEnvVariables);
    expect(result.DATASOURCE_USERNAME).toBe(validEnv.DATASOURCE_USERNAME);
    expect(result.DATASOURCE_PASSWORD).toBe(validEnv.DATASOURCE_PASSWORD);
    expect(result.DATASOURCE_DATABASE).toBe(validEnv.DATASOURCE_DATABASE);
    expect(result.DATASOURCE_HOST).toBe(validEnv.DATASOURCE_HOST);
    expect(result.DATASOURCE_PORT).toBe(validEnv.DATASOURCE_PORT);
    expect(result.SALT_ROUND).toBe(validEnv.SALT_ROUND);
    expect(result.APP_PORT).toBe(validEnv.APP_PORT);
    expect(result.APP_PREFIX).toBe(validEnv.APP_PREFIX);
    expect(result.NODE_ENV).toBe(validEnv.NODE_ENV);
    expect(result.SWAGGER_PATH).toBe(validEnv.SWAGGER_PATH);
    expect(result.SWAGGER_DESC).toBe(validEnv.SWAGGER_DESC);
    expect(result.SWAGGER_TITLE).toBe(validEnv.SWAGGER_TITLE);
    expect(result.SWAGGER_LICENCE).toBe(validEnv.SWAGGER_LICENCE);
    expect(result.SWAGGER_LICENCE_URL).toBe(validEnv.SWAGGER_LICENCE_URL);
    expect(result.SWAGGER_SERV).toBe(validEnv.SWAGGER_SERV);
    expect(result.SWAGGER_VERSION).toBe(validEnv.SWAGGER_VERSION);
  });

  it("should throw an InternalServerErrorException with invalid input", () => {
    const invalidEnv = {
      DATASOURCE_USERNAME: "",
      DATASOURCE_PASSWORD: "password",
      DATASOURCE_DATABASE: "database",
      DATASOURCE_HOST: "localhost",
      DATASOURCE_PORT: -1, // Invalid port
      SALT_ROUND: 10,
      APP_PORT: 3000,
      APP_PREFIX: "",
      NODE_ENV: "development",
      SWAGGER_PATH: "/swagger",
      SWAGGER_DESC: "API Documentation",
      SWAGGER_TITLE: "API Title",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_LICENCE_URL: "http://license.url",
      SWAGGER_SERV: "https://api.example.com",
      SWAGGER_VERSION: "1.0.0",
    };

    expect(() => ValidateEnvVariables.EnvValidation(invalidEnv)).toThrow(
      InternalServerErrorException
    );
  });

  it("should throw an InternalServerErrorException for missing required properties", () => {
    const missingPropertiesEnv = {
      DATASOURCE_PASSWORD: "password",
      DATASOURCE_DATABASE: "database",
      // DATASOURCE_USERNAME is missing
      DATASOURCE_HOST: "localhost",
      DATASOURCE_PORT: 5432,
      SALT_ROUND: 10,
      APP_PORT: 3000,
      APP_PREFIX: "/api",
      NODE_ENV: "development",
      SWAGGER_PATH: "/swagger",
      SWAGGER_DESC: "API Documentation",
      SWAGGER_TITLE: "API Title",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_LICENCE_URL: "http://license.url",
      SWAGGER_SERV: "https://api.example.com",
      SWAGGER_VERSION: "1.0.0",
    };

    expect(() =>
      ValidateEnvVariables.EnvValidation(missingPropertiesEnv)
    ).toThrow(InternalServerErrorException);
  });

  it("should throw an InternalServerErrorException for incorrect types", () => {
    const incorrectTypeEnv = {
      DATASOURCE_USERNAME: "user",
      DATASOURCE_PASSWORD: "password",
      DATASOURCE_DATABASE: "database",
      DATASOURCE_HOST: "localhost",
      DATASOURCE_PORT: "5432", // Incorrect type (should be number)
      SALT_ROUND: 10,
      APP_PORT: 3000,
      APP_PREFIX: "/api",
      NODE_ENV: "development",
      SWAGGER_PATH: "/swagger",
      SWAGGER_DESC: "API Documentation",
      SWAGGER_TITLE: "API Title",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_LICENCE_URL: "http://license.url",
      SWAGGER_SERV: "https://api.example.com",
      SWAGGER_VERSION: "1.0.0",
    };

    expect(() => ValidateEnvVariables.EnvValidation(incorrectTypeEnv)).toThrow(
      InternalServerErrorException
    );
  });
  it("should throw an InternalServerErrorException for overly long environment variables", () => {
    const overlyLongEnv = {
      DATASOURCE_USERNAME: "u".repeat(256), // Exceeding length limit
      DATASOURCE_PASSWORD: "password",
      DATASOURCE_DATABASE: "database",
      DATASOURCE_HOST: "localhost",
      DATASOURCE_PORT: 5432,
      SALT_ROUND: 10,
      APP_PORT: 3000,
      APP_PREFIX: "/api",
      NODE_ENV: "development",
      SWAGGER_PATH: "/swagger",
      SWAGGER_DESC: "API Documentation",
      SWAGGER_TITLE: "API Title",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_LICENCE_URL: "http://license.url",
      SWAGGER_SERV: "https://api.example.com",
      SWAGGER_VERSION: "1.0.0",
    };

    expect(() => ValidateEnvVariables.EnvValidation(overlyLongEnv)).toThrow(
      InternalServerErrorException
    );
  });

  describe("ValidateEnvironment", () => {
    it("should throw an InternalServerErrorException for SQL injection patterns", () => {
      const maliciousEnv = {
        DATASOURCE_USERNAME: "user'; DROP TABLE users; --",
        DATASOURCE_PASSWORD: "password",
        DATASOURCE_DATABASE: "database",
        DATASOURCE_HOST: "localhost",
        DATASOURCE_PORT: 5432,
        SALT_ROUND: 10,
        APP_PORT: 3000,
        APP_PREFIX: "/api",
        NODE_ENV: "development",
        SWAGGER_PATH: "/swagger",
        SWAGGER_DESC: "API Documentation",
        SWAGGER_TITLE: "API Title",
        SWAGGER_LICENCE: "MIT",
        SWAGGER_LICENCE_URL: "http://license.url",
        SWAGGER_SERV: "https://api.example.com",
        SWAGGER_VERSION: "1.0.0",
      };

      expect(() => ValidateEnvVariables.EnvValidation(maliciousEnv)).toThrow(
        InternalServerErrorException
      );
    });
  });

  it("should throw an InternalServerErrorException for weak passwords", () => {
    const weakPasswordEnv = {
      DATASOURCE_USERNAME: "user",
      DATASOURCE_PASSWORD: "12345", // Weak password
      DATASOURCE_DATABASE: "database",
      DATASOURCE_HOST: "localhost",
      DATASOURCE_PORT: 5432,
      SALT_ROUND: 10,
      APP_PORT: 3000,
      APP_PREFIX: "/api",
      NODE_ENV: "development",
      SWAGGER_PATH: "/swagger",
      SWAGGER_DESC: "API Documentation",
      SWAGGER_TITLE: "API Title",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_LICENCE_URL: "http://license.url",
      SWAGGER_SERV: "https://api.example.com",
      SWAGGER_VERSION: "1.0.0",
    };

    expect(() => ValidateEnvVariables.EnvValidation(weakPasswordEnv)).toThrow(
      InternalServerErrorException
    );
  });
});
