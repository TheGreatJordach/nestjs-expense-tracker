import {
  ConflictException,
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

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordProvider: PasswordProvider,
    private readonly userService: UserService
  ) {}
  async registration(createUserDto: CreateUserDto) {
    const ifEmailUsed: boolean = await this.userService.ifEmailUsed(
      createUserDto.email
    );
    if (ifEmailUsed) throw new ConflictException("Email already exists");

    const hashedPassword = await this.passwordProvider.hashPassword(
      createUserDto.password
    );
    if (!hashedPassword)
      throw new InternalServerErrorException("Failed to hash password");

    return await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
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
    return { message: "Your are logged in" };
  }
}
