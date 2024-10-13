import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create.user.dto";
import { Email } from "../../common/types/email/email.type";
import { validateEmail } from "../../common/types/email/email.util";
import { UpdateUserDto } from "./dto/update.user.dto";

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Creates a new user based on the provided user data.
   *
   * @param createUserDto - The data to create the user with.
   * @returns A Promise that resolves to the newly created User object.
   * @throws ConflictException if a user with the same email already exists.
   * @throws InternalServerErrorException if an internal server error occurs during user creation.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.dataSource.transaction<User>(
      async (transactionEntityManager) => {
        try {
          const newUser: User = transactionEntityManager.create(
            User,
            createUserDto
          );

          // This will throw NotFoundException() if !user
          const validUser: User = this.resultHelper(newUser);

          return await transactionEntityManager.save(validUser);
        } catch (error) {
          console.error(
            `Error occurred during user creation: ${error.message}`
          );

          throw new InternalServerErrorException();
        }
      }
    );
  }

  /**
   * Checks if a user with the provided email already exists.
   *
   * @param email - The email to check for existence.
   * @returns A Promise that resolves to a boolean indicating if the email is already in use.
   * @throws InternalServerErrorException if an error occurs during the check process.
   */
  async ifEmailUsed(email: string): Promise<boolean> {
    return this.dataSource.transaction<boolean>(async (userTransaction) => {
      try {
        const response = await userTransaction.count(User, {
          where: { email: email },
        });
        return response > 0;
      } catch (error) {
        console.log(error.toString());
        throw new InternalServerErrorException("Failed to check if user Exist");
      }
    });
  }

  /**
   * Finds a user based on the provided identifier, which can be an email or a number.
   *
   * @param identifier - The email or number identifier to search for the user.
   * @returns A Promise that resolves to the User object if found.
   * @throws UnauthorizedException if the identifier is not valid or authorized.
   */
  async findUserByIdentifier(identifier: Email | number): Promise<User> {
    if (typeof identifier === "number") {
      return this.findUserById(identifier);
    } else {
      // Validate and handle email using the validateEmail function
      try {
        // This will throw BadRequestException – if the Email format is invalid
        validateEmail(identifier);
        return this.findUserByEmail(identifier); // If valid, search for the user by email
      } catch (error) {
        throw new BadRequestException(`Invalid identifier: ${error.message}`);
      }
    }
  }

  private async findUserById(id: number): Promise<User> {
    const user = await this.dataSource.transaction<User>(
      async (useTransaction) => {
        return useTransaction.findOneBy(User, { id });
      }
    );

    return this.resultHelper(user); // Handle user existence
  }

  private async findUserByEmail(email: Email): Promise<User> {
    const user = await this.dataSource.transaction<User>(
      async (useTransaction) => {
        return useTransaction.findOneBy(User, { email: email as string }); // Ensure email is a string
      }
    );

    return this.resultHelper(user); // Handle user existence
  }

  private resultHelper(user: User | null): User {
    if (!user) {
      throw new NotFoundException(); // Handle user not found
    }
    return user; // Return the user if found
  }

  async updateUser(
    identifier: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.dataSource.transaction<User>(async (useTransaction) => {
      const updatedUser: User = await useTransaction.preload(User, {
        id: identifier,
        ...updateUserDto,
      });
      const validUser = this.resultHelper(updatedUser);
      try {
        return await useTransaction.save(validUser);
      } catch (error) {
        throw new BadRequestException();
      }
    });
  }
}
