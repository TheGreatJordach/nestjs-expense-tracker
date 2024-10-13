import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { User } from "../../expense-manager/users/entity/user.entity";
import { Expense } from "../../expense-manager/expenses/entity/expense.entity";

export const getDatabaseConfig = async (
  configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
  type: "postgres",
  host: configService.get<string>("DATASOURCE_HOST"),
  port: configService.get<number>("DATASOURCE_PORT"),
  username: configService.get<string>("DATASOURCE_USERNAME"),
  password: configService.get<string>("DATASOURCE_PASSWORD"),
  database: configService.get<string>("DATASOURCE_DATABASE"),
  entities: [User, Expense],
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
