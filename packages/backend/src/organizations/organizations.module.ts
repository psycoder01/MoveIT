import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationsService } from "src/organizations/organizations.service";
import { OrganizationsController } from "src/organizations/organizations.controller";
import { Organization } from "src/organizations/entities/organization.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
