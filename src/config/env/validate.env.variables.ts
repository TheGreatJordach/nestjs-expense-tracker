import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsStrongPassword,
  Length,
  validateSync,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { InternalServerErrorException } from "@nestjs/common";
import { IsSafeString } from "../../common/decorators/is.safe.string.sec.decorator";

export class ValidateEnvVariables {
  //DB
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  @IsSafeString()
  DATASOURCE_USERNAME: string;

  @IsSafeString()
  @IsStrongPassword()
  DATASOURCE_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  DATASOURCE_DATABASE: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  DATASOURCE_HOST: string;
  @IsPositive()
  @IsInt()
  DATASOURCE_PORT: number;

  //BCRYPT
  @IsPositive()
  @IsInt()
  SALT_ROUND: number;
  // APP
  @IsPositive()
  @IsInt()
  APP_PORT: number;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  APP_PREFIX: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  NODE_ENV: string;
  //SWAGGER
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  SWAGGER_PATH: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  SWAGGER_DESC: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  SWAGGER_TITLE: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  SWAGGER_LICENCE: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  SWAGGER_LICENCE_URL: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_SERV: string;
  @IsNotEmpty()
  @IsString()
  @IsSafeString()
  SWAGGER_VERSION: string;

  // Custom validation method to check environment variables
  public static EnvValidation(options: Record<string, unknown>) {
    const validated = plainToInstance(ValidateEnvVariables, options, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validated, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new InternalServerErrorException(
        `${errors.length} environments variables failed validation ${errors.toString()}`
      );
    }

    return validated;
  }
}
