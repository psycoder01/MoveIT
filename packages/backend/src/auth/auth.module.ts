import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { HttpService } from "src/services/http/http.service";
import { KeycloakService } from "src/services/keycloak/keycloak.service";

import { UsersModule } from "src/users/users.module";
import { KeycloakStrategy } from "src/auth/guards/keycloak.strategy";

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [HttpService, KeycloakService, KeycloakStrategy, AuthService],
})
export class AuthModule {}
