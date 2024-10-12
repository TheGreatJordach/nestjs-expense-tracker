import { Expense } from "../../expenses/entity/expense.entity";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserBaseDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  readonly firstName: string;

  @ApiProperty({ type: String })
  @Length(3, 25)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly lastName?: string;
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: Expense })
  @Type(() => Expense)
  @ValidateNested({ each: true })
  readonly expenses: Expense[];
}
