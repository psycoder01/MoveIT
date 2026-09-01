import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { NotificationsService } from "src/notifications/notifications.service";
import { Invitation } from "src/invitations/entities/invitation.entity";
import { notificationMapper } from "./mappers/notification.mapper";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";
import { NotificationType } from "src/notifications/types/notification.types";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern("invitation.created")
  create(@Payload() payload: Invitation) {
    return this.notificationsService.create({
      ...payload,
      type: NotificationType.ORG_INVITATION,
    });
  }

  @UseGuards(KeycloakAuthGuard)
  @Get("/user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    const notifications = await this.notificationsService.findByUserId(userId);
    const data = notifications.map((notification) =>
      notificationMapper.toDto(notification),
    );

    return {
      message: "Notifications fetched successfully.",
      data,
    };
  }
}
