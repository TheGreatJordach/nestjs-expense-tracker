import { Module } from "@nestjs/common";

import { PasswordModule } from "./password/password.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { UserService } from "../expense-manager/users/user.service";
import { UserModule } from "../expense-manager/users/user.module";
import { JwtCookieProvider } from "./auth/cookies/jwt.cookie.provider";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "../config/jwt/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { AccessTokenGuard } from "./auth/guards/access.token.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    PasswordModule,
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    AuthService,
    UserService,
    JwtCookieProvider,
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
  controllers: [AuthController],
})
export class IamModule {}
