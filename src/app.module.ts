import { Module } from "@nestjs/common";
import { AppConfigurationModule } from "./config/app.configuration.module";

@Module({
  imports: [AppConfigurationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
