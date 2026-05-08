import { Module } from "@nestjs/common";

import ConfigModule from "./configs/env/env.module";

import { AppService } from "./app.service";

import { AppController } from "./app.controller";

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
