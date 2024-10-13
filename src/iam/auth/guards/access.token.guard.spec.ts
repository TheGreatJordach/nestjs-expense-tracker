import { AccessTokenGuard } from "./access.token.guard";
import { JwtService } from "@nestjs/jwt";
import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import jwtConfig from "../../../config/jwt/jwt.config";
import { ConfigType } from "@nestjs/config";
import { REQUEST_USER_KEY } from "../const/request.user.key";

describe("AccessTokenGuard", () => {
  let accessTokenGuard: AccessTokenGuard;
  let jwtService: JwtService;
  let jwtConfiguration: ConfigType<typeof jwtConfig>;

  beforeEach(() => {
    jwtService = { verify: jest.fn() } as unknown as JwtService;
    jwtConfiguration = {
      secret: "test-secret",
      accessTokenTtl: 3600,
      audience: "string",
      issuer: "string",
    };
    accessTokenGuard = new AccessTokenGuard(jwtService, jwtConfiguration);
  });

  describe("canActivate", () => {
    let context: ExecutionContext;

    beforeEach(() => {
      context = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn(),
        }),
      } as unknown as ExecutionContext;
    });

    it("should return true if the token is valid", async () => {
      const token = "valid.token.here";
      const request = { headers: { authorization: `Bearer ${token}` } };
      context.switchToHttp().getRequest = jest.fn().mockReturnValue(request);

      const decoded = { userId: 1 }; // Example payload
      jwtService.verify = jest.fn().mockResolvedValue(decoded);

      const result = await accessTokenGuard.canActivate(context);

      expect(result).toBe(true);
      expect(request[REQUEST_USER_KEY]).toEqual(decoded);
      expect(jwtService.verify).toHaveBeenCalledWith(token, jwtConfiguration);
    });

    it("should throw an HttpException if no token is provided", async () => {
      const request = { headers: {} }; // No authorization header
      context.switchToHttp().getRequest = jest.fn().mockReturnValue(request);

      await expect(accessTokenGuard.canActivate(context)).rejects.toThrowError(
        new HttpException(
          {
            error: "AuthError",
            data: undefined,
            success: false,
            message: "Access denied",
          },
          HttpStatus.UNAUTHORIZED
        )
      );
    });

    it("should throw an HttpException if the token is invalid", async () => {
      const token = "invalid.token.here";
      const request = { headers: { authorization: `Bearer ${token}` } };
      context.switchToHttp().getRequest = jest.fn().mockReturnValue(request);

      jwtService.verify = jest
        .fn()
        .mockRejectedValue(new Error("Invalid token"));

      await expect(accessTokenGuard.canActivate(context)).rejects.toThrowError(
        new HttpException(
          {
            error: "AuthError",
            data: undefined,
            success: false,
            message: "Failed to authenticate token",
          },
          HttpStatus.UNAUTHORIZED
        )
      );
    });

    it("should handle errors securely and not expose sensitive information", async () => {
      const token = "valid.token.here";
      const request = { headers: { authorization: `Bearer ${token}` } };
      context.switchToHttp().getRequest = jest.fn().mockReturnValue(request);

      // Simulating a case where the verify method throws an error with sensitive information
      jwtService.verify = jest.fn().mockImplementation(() => {
        throw new Error("Sensitive error message");
      });

      await expect(accessTokenGuard.canActivate(context)).rejects.toThrowError(
        new HttpException(
          {
            error: "AuthError",
            data: undefined,
            success: false,
            message: "Failed to authenticate token",
          },
          HttpStatus.UNAUTHORIZED
        )
      );

      // Ensure that sensitive error information is not exposed
      expect(jwtService.verify).toHaveBeenCalled();
    });
  });
});
