import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../../../config/jwt/jwt.config";
import { Request } from "express";
import { REQUEST_USER_KEY } from "../const/request.user.key";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFormHeader(request);
    if (!token) {
      throw new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: `Access denied`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    try {
      request[REQUEST_USER_KEY] = await this.jwtService.verify(
        token,
        this.jwtConfiguration
      );
    } catch (error) {
      throw new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: `Failed to authenticate token`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    return true;
  }

  private extractTokenFormHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers.authorization?.split(" ") ?? [];
    return token || undefined; // Return undefined if the token doesn't exist;
  }
}
