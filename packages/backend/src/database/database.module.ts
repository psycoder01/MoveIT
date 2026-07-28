import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

import { EnvVariables } from "src/configs/env/env.types";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvVariables>) => {
        const db = configService.get<EnvVariables["db"]>("db");

        if (!db) {
          throw new Error("DB config is missing");
        }

        return {
          type: "postgres",
          host: db.host,
          port: Number(db.port),
          username: db.username,
          password: db.password,
          database: db.database,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
