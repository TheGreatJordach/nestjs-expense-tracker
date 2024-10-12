import { Module } from "@nestjs/common";
import { UserModule } from "./users/user.module";
import { ExpenseModule } from "./expenses/expense.module";

@Module({
  imports: [UserModule, ExpenseModule],
})
export class ExpenseManagerModule {}
