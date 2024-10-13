import { Module } from "@nestjs/common";
import { AppConfigurationModule } from "./config/app.configuration.module";
import { ExpenseTrackerModule } from "./expense-manager/expense-tracker.module";
import { IamModule } from "./iam/iam.module";

@Module({
  imports: [AppConfigurationModule, ExpenseTrackerModule, IamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
