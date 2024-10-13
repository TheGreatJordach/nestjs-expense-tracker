import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { CreateUserDto } from "../../expense-manager/users/dto/create.user.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { Auth } from "../public-routes/auth.decorator";
import { AuthType } from "../public-routes/auth-type.enum";

@Auth(AuthType.Public)
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
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const accessToken = await this.authService.registration(createUserDto);
    response.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
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
  async sinIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const accessToken = await this.authService.login(signInDto);
    response.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }
}
