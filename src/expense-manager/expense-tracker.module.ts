import { Module } from "@nestjs/common";
import { UserModule } from "./users/user.module";
import { ExpenseModule } from "./expenses/expense.module";

import { ExpenseTrackerService } from "./expense-tracker.service";

import { UserService } from "./users/user.service";

@Module({
  imports: [UserModule, ExpenseModule],
  providers: [ExpenseTrackerService, UserService],
})
export class ExpenseTrackerModule {}
