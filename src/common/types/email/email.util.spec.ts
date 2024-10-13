import { HttpException, HttpStatus } from "@nestjs/common";

import { isValidateEmail } from "./email.util";
import { Email } from "./email.type";

describe("validateEmail", () => {
  it("should return the email if the format is valid", () => {
    const validEmail = "test@example.com";

    const result: Email = isValidateEmail(validEmail);

    expect(result).toBe(validEmail); // Check that the email is returned
  });

  it("should throw a BadRequestException if the email format is invalid", () => {
    const invalidEmail = "invalid-email";

    expect(() => isValidateEmail(invalidEmail)).toThrow(HttpException); // Expect an exception
    expect(() => isValidateEmail(invalidEmail)).toThrow(
      `Invalid email format ${invalidEmail}`
    ); // Check the message
  });

  it("should throw a BadRequestException if the email contains spaces", () => {
    const emailWithSpaces = "test @example.com";

    expect(() => isValidateEmail(emailWithSpaces)).toThrow(
      new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: `Invalid email format ${emailWithSpaces}`,
        },
        HttpStatus.BAD_REQUEST
      )
    ); // Expect an exception
    expect(() => isValidateEmail(emailWithSpaces)).toThrow(
      `Invalid email format ${emailWithSpaces}`
    ); // Check the message
  });

  it("should throw a BadRequestException if the email has missing domain part", () => {
    const invalidEmail = "test@.com";

    expect(() => isValidateEmail(invalidEmail)).toThrow(HttpException); // Expect an exception
    expect(() => isValidateEmail(invalidEmail)).toThrow(
      `Invalid email format ${invalidEmail}`
    ); // Check the message
  });

  it("should throw a BadRequestException if the email has missing '@' symbol", () => {
    const invalidEmail = "testexample.com";

    expect(() => isValidateEmail(invalidEmail)).toThrow(HttpException); // Expect an exception
    expect(() => isValidateEmail(invalidEmail)).toThrow(
      `Invalid email format ${invalidEmail}`
    ); // Check the message
  });
});
