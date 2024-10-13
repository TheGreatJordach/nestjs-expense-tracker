import { Injectable } from "@nestjs/common";
import { BcryptAlgorithmProvider } from "./hash/bcrypt.algorithm.provider";

@Injectable()
export class PasswordProvider {
  constructor(private readonly bcryptAlgorithm: BcryptAlgorithmProvider) {}

  async hashPassword(password: string | Buffer): Promise<string> {
    return await this.bcryptAlgorithm.hash(password);
  }

  async comparePassword(
    userPassword: string | Buffer,
    storedPassword: string
  ): Promise<boolean> {
    return await this.bcryptAlgorithm.compare(userPassword, storedPassword);
  }
}
