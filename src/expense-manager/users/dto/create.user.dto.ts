import { UserBaseDto } from "./user.base.dto";
import { IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends UserBaseDto {
  @ApiProperty({
    description: "The password for the user account",
    example: "StrongPassw0rd!",
    minLength: 8, // As per the rules of IsStrongPassword, you can set constraints like this
    maxLength: 100,
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character. Example: PassWord@@201",
    }
  )
  readonly password: string;
}
