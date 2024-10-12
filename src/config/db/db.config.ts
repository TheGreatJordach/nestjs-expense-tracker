import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const getDatabaseConfig = async (
  configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
  type: "postgres",
  host: configService.get<string>("DATASOURCE_HOST"),
  port: configService.get<number>("DATASOURCE_PORT"),
  username: configService.get<string>("DATASOURCE_USERNAME"),
  password: configService.get<string>("DATASOURCE_PASSWORD"),
  database: configService.get<string>("DATASOURCE_DATABASE"),
  entities: [],
  synchronize: true,
});

export const dataSourceFactory = async (options) => {
  if (!options) {
    throw new Error("DataSourceOption not provided");
  }
  const dataSource = new DataSource(options);
  await dataSource.initialize();
  return dataSource;
};
