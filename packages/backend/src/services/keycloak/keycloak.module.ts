import { Module } from "@nestjs/common";

import { KeycloakService } from "src/services/keycloak/keycloak.service";
import { HttpModule } from "src/services/http/http.module";

@Module({
  imports: [HttpModule],
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {}
