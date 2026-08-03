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

  @Get("/user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    const notifications = await this.notificationsService.findByUserId(userId);
    return {
      message: "Notifications fetched successfully.",
      data: notifications,
    };
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
