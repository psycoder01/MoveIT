import { Module } from "@nestjs/common";

import envModule from "src/configs/env/env.module";
import { DatabaseModule } from "src/database/database.module";

import { AuthModule } from "src/auth/auth.module";
import { OrganizationsModule } from "src/organizations/organizations.module";

@Module({
  imports: [envModule, DatabaseModule, AuthModule, OrganizationsModule],
})
export class AppModule {}
