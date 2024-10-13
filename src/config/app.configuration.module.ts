import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceFactory, getDatabaseConfig } from "./db/db.config";
import { ValidateEnvVariables } from "./env/validate.env.variables";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      cache: true,
      validate: ValidateEnvVariables.EnvValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
      dataSourceFactory: dataSourceFactory,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppConfigurationModule {}
