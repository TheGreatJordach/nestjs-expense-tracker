import { IHash } from "./hash.interface";
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from "@nestjs/common";
export class BcryptAlgorithmProvider implements IHash {
  private readonly saltRound = parseInt(process.env.SALT_ROUND) || 12;

  /**
   * Asynchronously compares the provided data with the encrypted string using bcrypt.
   *
   * @param data - The data to compare, can be a string or a Buffer.
   * @param encrypted - The encrypted string to compare the data with.
   * @returns A Promise that resolves to true if the data matches the encrypted string, false otherwise.
   * @throws UnauthorizedException if an error occurs during the comparison process.
   */
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    if (!this.isNonEmptyString(data) || !this.isNonEmptyString(encrypted)) {
      throw new UnauthorizedException("Data or encrypted string is empty.");
    }
    try {
      return await bcrypt.compare(data, encrypted);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  /**
   * Asynchronously generates a bcrypt hash for the provided data using a salt generated with the specified number of rounds.
   *
   * @param data - The data to be hashed, can be a string or a Buffer.
   * @returns A Promise that resolves to the generated bcrypt hash as a string.
   * @throws UnauthorizedException if an error occurs during the hashing process.
   */
  async hash(data: string | Buffer): Promise<string> {
    if (!this.isNonEmptyString(data)) {
      throw new UnauthorizedException("Data for hashing is empty.");
    }
    try {
      const salt = await bcrypt.genSalt(this.saltRound);
      return await bcrypt.hash(data, salt);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private isNonEmptyString(value: string | Buffer): boolean {
    if (typeof value === "string") {
      return value.trim().length > 0; // Check for non-empty trimmed string
    } else if (Buffer.isBuffer(value)) {
      return value.length > 0; // Check for non-empty Buffer
    }
    return false; // Not a valid input
  }
}
