import { Expense } from "../../expenses/entity/expense.entity";
import { Expose } from "class-transformer";

export class PublicUserDto {
  @Expose()
  readonly id: number;
  @Expose()
  readonly firstName: string;
  @Expose()
  readonly lastName: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly expenses: Expense[];
}
