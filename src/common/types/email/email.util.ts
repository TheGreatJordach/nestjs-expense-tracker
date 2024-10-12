import { BadRequestException } from "@nestjs/common";
import { Email } from "./email.type";

/**
 * Validates the format of an email address.
 *
 * @param email The email address to validate.
 * @returns The validated email address with the 'brand' symbol.
 * @throws BadRequestException if the email address format is invalid.
 */
export function validateEmail(email: string): Email {
  // More efficient email validation regex to avoid potential ReDoS vulnerability
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    throw new BadRequestException(`Invalid email format ${email}`);
  }
  return email as Email; // Cast to an Email type
}
