import { Test, TestingModule } from "@nestjs/testing";

import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { UserService } from "../expense-manager/users/user.service";
import { PasswordProvider } from "./password/password.provider";
import { JwtCookieProvider } from "./auth/cookies/jwt.cookie.provider";
import { CreateUserDto } from "../expense-manager/users/dto/create.user.dto";
import { User } from "../expense-manager/users/entity/user.entity";
import { SignInDto } from "./dto/sign-in.dto";

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let passwordProvider: PasswordProvider;
  let jwtCookieProvider: JwtCookieProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            ifEmailUsed: jest.fn(),
            create: jest.fn(),
            findUserByIdentifier: jest.fn(),
          },
        },
        {
          provide: PasswordProvider,
          useValue: {
            hashPassword: jest.fn(),
            comparePassword: jest.fn(),
          },
        },
        {
          provide: JwtCookieProvider,
          useValue: {
            generateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    passwordProvider = module.get<PasswordProvider>(PasswordProvider);
    jwtCookieProvider = module.get<JwtCookieProvider>(JwtCookieProvider);
  });

  describe("registration", () => {
    it("should register a user and return a token", async () => {
      const createUserDto: CreateUserDto = {
        expenses: [],
        firstName: "",
        email: "test@example.com",
        password: "password123",
      };
      const hashedPassword = "hashedPassword";
      const createdUser: User = {
        id: 1,
        firstName: createUserDto.firstName,
        email: createUserDto.email,
        password: hashedPassword,
        expenses: [],
      };

      jest.spyOn(userService, "ifEmailUsed").mockResolvedValue(false);
      jest
        .spyOn(passwordProvider, "hashPassword")
        .mockResolvedValue(hashedPassword);
      jest.spyOn(userService, "create").mockResolvedValue(createdUser);
      jest
        .spyOn(jwtCookieProvider, "generateToken")
        .mockResolvedValue({ token: "someToken" });

      const result = await authService.registration(createUserDto);

      expect(result).toEqual({ token: "someToken" });
      expect(userService.ifEmailUsed).toHaveBeenCalledWith(createUserDto.email);
      expect(passwordProvider.hashPassword).toHaveBeenCalledWith(
        createUserDto.password
      );
      expect(userService.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(jwtCookieProvider.generateToken).toHaveBeenCalledWith(
        createdUser.id,
        createdUser.email
      );
    });

    it("should throw an HttpException if the email is already registered", async () => {
      const createUserDto: CreateUserDto = {
        expenses: [],
        firstName: "",
        email: "test@example.com",
        password: "password123",
      };
      jest.spyOn(userService, "ifEmailUsed").mockResolvedValue(true);

      await expect(authService.registration(createUserDto)).rejects.toThrow(
        HttpException
      );
      await expect(authService.registration(createUserDto)).rejects.toThrow(
        new HttpException(
          {
            error: "AuthError",
            data: undefined,
            success: false,
            message: `The email ${createUserDto.email} is already registered `,
          },
          HttpStatus.UNAUTHORIZED
        )
      );
    });

    it("should throw an InternalServerErrorException if password hashing fails", async () => {
      const createUserDto: CreateUserDto = {
        expenses: [],
        firstName: "",
        email: "test@example.com",
        password: "password123",
      };
      jest.spyOn(userService, "ifEmailUsed").mockResolvedValue(false);
      jest.spyOn(passwordProvider, "hashPassword").mockResolvedValue(null); // Simulate failure

      await expect(authService.registration(createUserDto)).rejects.toThrow(
        InternalServerErrorException
      );
      await expect(authService.registration(createUserDto)).rejects.toThrow(
        "Failed to hash password"
      );
    });

    it("should throw an HttpException if the created user has an invalid email", async () => {
      const createUserDto: CreateUserDto = {
        expenses: [],
        firstName: "",
        email: "test@example.com",
        password: "password123",
      };
      const hashedPassword = "hashedPassword";
      jest.spyOn(userService, "ifEmailUsed").mockResolvedValue(false);
      jest
        .spyOn(passwordProvider, "hashPassword")
        .mockResolvedValue(hashedPassword);
      const mockEmail = null;
      jest.spyOn(userService, "create").mockResolvedValue({
        id: 1,
        email: mockEmail,
        password: hashedPassword,
        firstName: "",
        expenses: [],
      });

      await expect(authService.registration(createUserDto)).rejects.toThrow(
        HttpException
      );
      await expect(authService.registration(createUserDto)).rejects.toThrow(
        new HttpException(
          {
            error: "AuthError",
            data: undefined,
            success: false,
            message: `Invalid email format ${mockEmail}`,
          },
          HttpStatus.UNAUTHORIZED
        )
      );
    });
  });

  describe("login", () => {
    it("should log in a user and return a token", async () => {
      const signInDto: SignInDto = {
        email: "test@example.com",
        password: "password123",
      };
      const storedUser: User = {
        expenses: [],
        firstName: "",
        id: 1,
        email: signInDto.email,
        password: "hashedPassword",
      };

      jest
        .spyOn(userService, "findUserByIdentifier")
        .mockResolvedValue(storedUser);
      jest.spyOn(passwordProvider, "comparePassword").mockResolvedValue(true);
      jest
        .spyOn(jwtCookieProvider, "generateToken")
        .mockResolvedValue({ token: "someToken" });

      const result = await authService.login(signInDto);

      expect(result).toEqual({ token: "someToken" });
      expect(userService.findUserByIdentifier).toHaveBeenCalledWith(
        signInDto.email
      );
      expect(passwordProvider.comparePassword).toHaveBeenCalledWith(
        signInDto.password,
        storedUser.password
      );
      expect(jwtCookieProvider.generateToken).toHaveBeenCalledWith(
        storedUser.id,
        storedUser.email
      );
    });

    it("should throw an UnauthorizedException if email not found", async () => {
      const signInDto: SignInDto = {
        email: "test@example.com",
        password: "password123",
      };
      jest.spyOn(userService, "findUserByIdentifier").mockResolvedValue(null);

      await expect(authService.login(signInDto)).rejects.toThrow(
        UnauthorizedException
      );
      await expect(authService.login(signInDto)).rejects.toThrow(
        "Email not found exists"
      );
    });

    it("should throw an UnauthorizedException if password is incorrect", async () => {
      const signInDto: SignInDto = {
        email: "test@example.com",
        password: "wrongPassword",
      };
      const storedUser: User = {
        expenses: [],
        firstName: "",
        id: 1,
        email: signInDto.email,
        password: "hashedPassword",
      };

      jest
        .spyOn(userService, "findUserByIdentifier")
        .mockResolvedValue(storedUser);
      jest.spyOn(passwordProvider, "comparePassword").mockResolvedValue(false); // Password does not match

      await expect(authService.login(signInDto)).rejects.toThrow(
        UnauthorizedException
      );
      await expect(authService.login(signInDto)).rejects.toThrow(
        "Invalid email or password"
      );
    });
  });
});
