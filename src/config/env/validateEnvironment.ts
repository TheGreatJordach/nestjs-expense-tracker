import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  validateSync,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { InternalServerErrorException } from "@nestjs/common";

export class ValidateEnvironment {
  //DB
  @IsNotEmpty()
  @IsString()
  DATASOURCE_USERNAME: string;
  @IsNotEmpty()
  @IsString()
  DATASOURCE_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  DATASOURCE_DATABASE: string;
  @IsNotEmpty()
  @IsString()
  DATASOURCE_HOST: string;
  @IsPositive()
  @IsInt()
  DATASOURCE_PORT: number;

  // APP
  @IsPositive()
  @IsInt()
  APP_PORT: number;
  @IsNotEmpty()
  @IsString()
  APP_PREFIX: string;

  //SWAGGER
  @IsNotEmpty()
  @IsString()
  SWAGGER_PATH: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_DESC: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_TITLE: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_LICENCE: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_LICENCE_URL: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_SERV: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_VERSION: string;
}

export function EnvValidation(options: Record<string, unknown>) {
  const validated = plainToInstance(ValidateEnvironment, options, {
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
