import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpService } from "./services/http.service";

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, HttpService],
})
export class AppModule {}
