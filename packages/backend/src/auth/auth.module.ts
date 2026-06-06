import { Module } from "@nestjs/common";

import ConfigModule from "src/configs/env/env.module";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { HttpService } from "src/services/http/http.service";
import { KeycloakService } from "src/services/keycloak/keycloak.service";

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [HttpService, KeycloakService, AuthService],
})
export class AuthModule {}
