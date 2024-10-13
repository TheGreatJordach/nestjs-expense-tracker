import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../../../config/jwt/jwt.config";
import { ConfigType } from "@nestjs/config";
import { isValidJwtConfig } from "../util/is.valid.jwt.config";

@Injectable()
export class JwtCookieProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  private readonly tokenConfig = {
    audience: this.jwtConfiguration.audience,
    issuer: this.jwtConfiguration.issuer,
    secret: this.jwtConfiguration.secret,
    expiresIn: this.jwtConfiguration.accessTokenTtl,
  };

  async generateToken(sub: number, email: string) {
    // Check the JWT configuration validity before proceeding
    const isValidConfig = await isValidJwtConfig(this.jwtConfiguration);

    if (!isValidConfig) {
      throw new HttpException(
        {
          error: "ConfigError",
          data: undefined,
          success: false,
          message: "Invalid JWT configuration",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      const { audience, issuer, secret, expiresIn } = this.tokenConfig;
      const accessToken = await this.jwtService.signAsync(
        {
          sub,
          email,
        },
        { audience, issuer, secret, expiresIn }
      );

      return { token: accessToken };
    } catch (error) {
      // Handle any other unexpected errors
      throw new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: `Authentication failed with error: Token generation failed"`,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
