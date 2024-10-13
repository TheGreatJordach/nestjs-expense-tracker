import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateUserDto } from "../../expense-manager/users/dto/create.user.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "../dto/sign-in.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 401,
    description: "Authentication failed.",
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered.",
  })
  @ApiBody({
    description: "Create new user",
    type: CreateUserDto,
  })
  @Post("sign-up")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: "Login Succeed.",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized.",
  })
  @ApiBody({
    description: "Login a user",
    type: SignInDto,
  })
  @Post("sign-in")
  async sinIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
}
