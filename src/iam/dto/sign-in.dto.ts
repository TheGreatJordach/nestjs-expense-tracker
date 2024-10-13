import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "../../expense-manager/users/dto/create.user.dto";

export class SignInDto extends OmitType(CreateUserDto, [
  "lastName",
  "expenses",
  "firstName",
]) {}
