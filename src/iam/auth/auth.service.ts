import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../../expense-manager/users/dto/create.user.dto";
import { PasswordProvider } from "../password/password.provider";
import { UserService } from "../../expense-manager/users/user.service";
import { SignInDto } from "../dto/sign-in.dto";
import { Email } from "../../common/types/email/email.type";
import { User } from "../../expense-manager/users/entity/user.entity";
import { JwtCookieProvider } from "./cookies/jwt.cookie.provider";
import { isValidateEmail } from "../../common/types/email/email.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordProvider: PasswordProvider,
    private readonly jwtCookiesProvider: JwtCookieProvider,
    private readonly userService: UserService
  ) {}
  async registration(createUserDto: CreateUserDto) {
    const ifEmailUsed: boolean = await this.userService.ifEmailUsed(
      createUserDto.email
    );
    if (ifEmailUsed)
      // Handle any other unexpected errors
      throw new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: `The email ${createUserDto.email} is already registered `,
        },
        HttpStatus.UNAUTHORIZED
      );

    const hashedPassword = await this.passwordProvider.hashPassword(
      createUserDto.password
    );
    if (!hashedPassword)
      throw new InternalServerErrorException("Failed to hash password");

    const createdUser: User = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    if (!createdUser || !isValidateEmail(createdUser.email)) {
      // Handle any other unexpected errors
      throw new HttpException(
        {
          error: "AuthError",
          data: undefined,
          success: false,
          message: `No user Found or wrong Email format `,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    const { id, email } = createdUser;
    return this.jwtCookiesProvider.generateToken(id, email);
  }

  async login(signInDto: SignInDto) {
    const storedUser: User = await this.userService.findUserByIdentifier(
      signInDto.email as Email
    );
    if (!storedUser) throw new UnauthorizedException("Email not found exists");
    const isMatch: boolean = await this.passwordProvider.comparePassword(
      signInDto.password,
      storedUser.password
    );
    if (!isMatch) throw new UnauthorizedException("Invalid email or password");

    return await this.jwtCookiesProvider.generateToken(
      storedUser.id,
      storedUser.email
    );
  }
}
