import { config } from "dotenv";
import { existsSync } from "fs";
import { join } from "path";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// Ugly trick to load environment variable,
// the path being different between local and production.
// Don't know what have been messed up in the project to have such a situation.
let envPath = join(__dirname, '.env')
if (!existsSync(envPath)) {
  envPath = join(__dirname, '..', '.env')
}
config({path: envPath});

const typeormConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  migrationsTableName: "typeorm_migrations",
  migrationsRun: true,
};

// This datasource is used to generate migrations
const datasource = new DataSource(typeormConfig);

export { typeormConfig, datasource };
