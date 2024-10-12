import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvValidation } from "./env/validateEnvironment";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      cache: true,
      validate: EnvValidation,
    }),
  ],
})
export class AppConfigurationModule {}
