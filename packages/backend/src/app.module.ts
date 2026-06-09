import { Module } from "@nestjs/common";

import envModule from "src/configs/env/env.module";
import { DatabaseModule } from "src/database/database.module";
import { OrganizationsModule } from "src/organizations/organizations.module";

@Module({
  imports: [envModule, DatabaseModule, OrganizationsModule],
})
export class AppModule {}
