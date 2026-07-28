import { Module } from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { InvitationsController } from "./invitations.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Invitation } from "./entities/invitation.entity";
import { KafkaModule } from "src/configs/kafka/kafka.module";
import { UsersModule } from "src/users/users.module";
import { OrganizationsModule } from "src/organizations/organizations.module";

@Module({
  imports: [
    UsersModule,
    KafkaModule,
    OrganizationsModule,
    TypeOrmModule.forFeature([Invitation]),
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationsModule {}
