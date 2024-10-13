import { Module } from "@nestjs/common";

import { PasswordModule } from "./password/password.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { UserService } from "../expense-manager/users/user.service";
import { UserModule } from "../expense-manager/users/user.module";

@Module({
  imports: [PasswordModule, UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class IamModule {}
