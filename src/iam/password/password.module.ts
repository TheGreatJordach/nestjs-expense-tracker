import { Module } from "@nestjs/common";
import { PasswordProvider } from "./password.provider";
import { BcryptAlgorithmProvider } from "./hash/bcrypt.algorithm.provider";

@Module({
  providers: [PasswordProvider, BcryptAlgorithmProvider],
  exports: [PasswordProvider],
})
export class PasswordModule {}
