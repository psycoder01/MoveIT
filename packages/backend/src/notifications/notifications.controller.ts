import { Controller, Get, Param, Delete } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { NotificationsService } from "./notifications.service";
import { Invitation } from "src/invitations/entities/invitation.entity";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern("invitation.created")
  create(@Payload() payload: Invitation) {
    return this.notificationsService.create({ ...payload, type: "invitation" });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
