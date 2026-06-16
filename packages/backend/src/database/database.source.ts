import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../users/entities/user.entity";
import { Organization } from "../organizations/entities/organization.entity";

dotenv.config({ path: [".env.prod", ".env.dev", ".env"] });

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [Organization, User],
  migrations: ["src/database/migrations/*.ts"],
});
