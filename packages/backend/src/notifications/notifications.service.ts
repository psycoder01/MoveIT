import { v4 as uuidv4 } from "uuid";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Invitation } from "src/invitations/entities/invitation.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import {
  NotificationType,
  NotificationWithOrganization,
} from "src/notifications/types/notification.types";

interface DefaultEvent {
  id: string;
  user_id: string;
  type: string;
}

interface CreatedEventPayload extends Invitation, DefaultEvent {
  type: NotificationType;
}

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(payload: CreatedEventPayload) {
    const { id: reference_id, user_id, type } = payload;

    const notificationPayload = {
      id: uuidv4(),
      user_id,
      reference_id,
      type: type,
      is_read: false,
      title: "Notification",
      message: "",
    };

    return this.notificationRepository.save(notificationPayload);
  }

  async findByUserId(userId: string) {
    const result = await this.notificationRepository
      .createQueryBuilder("notifications")
      .leftJoin("invitations", "inv", "inv.id = notifications.reference_id")
      .leftJoin("organizations", "org", "org.id = inv.organization_id")
      .addSelect("org.name", "organization")
      .where("notifications.user_id = :userId", { userId })
      .getRawMany();
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const data = result.map((r) => ({
      id: r.notifications_id,
      user_id: r.notifications_user_id,
      organization: r.organization,
      reference_id: r.notifications_reference_id,
      title: r.notifications_title,
      message: r.notifications_message,
      type: r.notifications_type,
      is_read: r.notifications_is_read,
      created_at: r.notifications_created_at,
      updated_at: r.notifications_updated_at,
    })) as NotificationWithOrganization[];
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    return data;
  }

  findOne(id: string) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
