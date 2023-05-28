import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  // type: "postgres",
  // host: "db",
  // port: 5432,
  // database: "rds",
  // username: "rds",
  // password: "sqlsql",

  type: "sqlite",
  database: "db.sqlite3",

  logging: true,
  maxQueryExecutionTime: 200,
  entities: ["src/entities/**.ts"],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  // "cache": true
});

export default AppDataSource;
