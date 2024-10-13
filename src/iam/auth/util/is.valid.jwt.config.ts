import { JwtConfigDto } from "../../dto/jwt.config.dto";
import { validateSync } from "class-validator";
import { HttpException, HttpStatus } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

export async function isValidJwtConfig(
  config: Record<string, unknown>
): Promise<boolean> {
  const validateConfig = plainToInstance(JwtConfigDto, config);

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  if (errors.length > 0) {
    const validationErrors = errors
      .map((err) => Object.values(err.constraints).join(", "))
      .join("; ");
    // Handle any other unexpected errors
    throw new HttpException(
      {
        error: "ServError",
        data: undefined,
        success: false,
        message: `JWT configuration validation failed: ${validationErrors}`,
      },
      HttpStatus.BAD_REQUEST
    );
  }
  return true;
}
