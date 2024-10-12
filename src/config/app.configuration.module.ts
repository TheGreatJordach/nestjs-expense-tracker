import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvValidation } from "./env/validateEnvironment";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceFactory, getDatabaseConfig } from "./db/db.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      cache: true,
      validate: EnvValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
      dataSourceFactory: dataSourceFactory,
    }),
  ],
})
export class AppConfigurationModule {}
