import { ConfigService } from "@nestjs/config";
import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { EnvVariables } from "./configs/env/env.types";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<EnvVariables, any>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
