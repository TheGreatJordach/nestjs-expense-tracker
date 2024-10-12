import { Module } from "@nestjs/common";
import { ExpenseManagerModule } from "../expense-manager/expense-manager.module";

@Module({
  imports: [ExpenseManagerModule],
})
export class IamModule {}
