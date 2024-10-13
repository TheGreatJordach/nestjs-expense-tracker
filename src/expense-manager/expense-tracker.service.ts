import { Injectable } from "@nestjs/common";
import { UserService } from "./users/user.service";
import { ExpenseService } from "./expenses/expense.service";

@Injectable()
export class ExpenseTrackerService {
  constructor(
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService
  ) {}
}
