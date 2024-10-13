import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PREFIX: string = configService.get<string>("APP_PREFIX");
  const PORT: number = configService.get<number>("APP_PORT");
  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT);
}
bootstrap();
