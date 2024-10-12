import { Module } from "@nestjs/common";
import { ExpenseManagerService } from "./expense.manager.service";

@Module({
  providers: [ExpenseManagerService],
})
export class ExpenseModule {}
