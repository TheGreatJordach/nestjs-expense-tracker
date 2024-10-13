import { JwtCookieProvider } from "./jwt.cookie.provider";
import { JwtService } from "@nestjs/jwt";
import { HttpException, HttpStatus } from "@nestjs/common";
import jwtConfig from "../../../config/jwt/jwt.config";
import { ConfigType } from "@nestjs/config";
import { isValidJwtConfig } from "../util/is.valid.jwt.config";

jest.mock("../util/is.valid.jwt.config");

describe("JwtCookieProvider", () => {
  let jwtCookieProvider: JwtCookieProvider;

  let jwtService: JwtService;
  let jwtConfiguration: ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    jwtService = new JwtService();
    jwtConfiguration = {
      audience: "test-audience",
      issuer: "test-issuer",
      secret: "test-secret",
      accessTokenTtl: 3600,
    };

    jwtCookieProvider = new JwtCookieProvider(jwtService, jwtConfiguration);
  });

  it("should throw an HttpException when audience or issuer is missing in configuration", async () => {
    jwtConfiguration.audience = undefined;
    jwtConfiguration.issuer = undefined;

    await expect(
      jwtCookieProvider.generateToken(1, "test@example.com")
    ).rejects.toThrow(
      new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: "Invalid JWT configuration",
        },
        HttpStatus.UNAUTHORIZED
      )
    );
  });

  it("should throw an HttpException when token generation fails", async () => {
    // Mock the isValidJwtConfig to return false
    jest
      .spyOn(jwtService, "signAsync")
      .mockRejectedValue(new Error("Token generation failed"));
    // jest.spyOn(yourUtilModule, 'isValidJwtConfig').mockResolvedValue(false); // Adjust the path to your utility

    await expect(
      jwtCookieProvider.generateToken(1, "test@example.com")
    ).rejects.toThrow(
      new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: "Invalid JWT configuration",
        },
        HttpStatus.UNAUTHORIZED
      )
    );
  });

  it("should throw an HttpException when JWT configuration validation fails", async () => {
    (isValidJwtConfig as jest.Mock).mockRejectedValue(
      new HttpException(
        {
          error: "ServError",
          data: undefined,
          success: false,
          message: "JWT configuration validation failed: Invalid issuer",
        },
        HttpStatus.BAD_REQUEST
      )
    );

    await expect(
      jwtCookieProvider.generateToken(1, "test@example.com")
    ).rejects.toThrow(
      new HttpException(
        {
          error: "ServError",
          data: undefined,
          success: false,
          message: "JWT configuration validation failed: Invalid issuer",
        },
        HttpStatus.BAD_REQUEST
      )
    );
  });

  it("should throw an HttpException if the JWT configuration is invalid", async () => {
    (isValidJwtConfig as jest.Mock).mockImplementation(() => {
      throw new HttpException(
        {
          error: "ServError",
          data: undefined,
          success: false,
          message: "JWT configuration validation failed: Invalid secret",
        },
        HttpStatus.BAD_REQUEST
      );
    });

    await expect(
      jwtCookieProvider.generateToken(1, "test@example.com")
    ).rejects.toThrow(
      new HttpException(
        {
          error: "ServError",
          data: undefined,
          success: false,
          message: "JWT configuration validation failed: Invalid secret",
        },
        HttpStatus.BAD_REQUEST
      )
    );
  });

  it("should reject a weak secret key for token signing", async () => {
    jwtConfiguration.secret = "123"; // weak secret

    await expect(
      jwtCookieProvider.generateToken(1, "test@example.com")
    ).rejects.toThrow(
      new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: "JWT configuration validation failed: Invalid secret",
        },
        HttpStatus.UNAUTHORIZED
      )
    );
  });
});
