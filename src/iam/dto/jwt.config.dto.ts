import { IsStrongSecret } from "../../common/decorators/is.strong.secret.sec.decorator";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { IsSafeString } from "../../common/decorators/is.safe.string.sec.decorator";

export class JwtConfigDto {
  @IsNotEmpty()
  @IsSafeString()
  @IsString({ message: "secret must be a string" })
  @IsStrongSecret({
    message: "The JWT secret must be a 64-byte hexadecimal string.",
  })
  secret: string;

  // Add other properties as necessary
  @IsNotEmpty()
  @IsString()
  @IsString({ message: "audience must be a string" })
  audience: string;
  @IsNotEmpty()
  @IsString({ message: "issuer must be a string" })
  issuer: string;
  @IsNotEmpty({ message: "AccessToken TTL is required" })
  @IsPositive()
  @IsInt()
  accessTokenTtl: number;
}
