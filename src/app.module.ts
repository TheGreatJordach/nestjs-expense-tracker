import { Module } from "@nestjs/common";
import { AppConfigurationModule } from "./config/app.configuration.module";
import { ExpenseManagerModule } from "./expense-manager/expense-manager.module";
import { IamModule } from "./iam/iam.module";

@Module({
  imports: [AppConfigurationModule, ExpenseManagerModule, IamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
