import { v4 as uuidv4 } from "uuid";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Invitation } from "src/invitations/entities/invitation.entity";
import { Notification } from "./entities/notification.entity";

interface DefaultEvent {
  id: string;
  user_id: string;
  type: string;
}

interface CreatedEventPayload extends Invitation, DefaultEvent {
  type: "default" | "invitation";
}

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(payload: CreatedEventPayload) {
    const { id: eventId, user_id, type } = payload;

    const notificationPayload = {
      id: uuidv4(),
      user_id,
      reference_id: eventId,
      type: type,
      is_read: false,
      title: type === "invitation" ? "Invitation" : "Notification",
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

    const data = result.map((r) => ({
      id: r.notifications_id,
      user_id: r.notifications_user_id,
      organization: r.organization,
      title: r.notifications_title,
      message: r.notifications_message,
      type: r.notifications_type,
      is_read: r.notifications_is_read,
      created_at: r.notifications_created_at,
      updated_at: r.notifications_updated_at,
    }));

    return data;
  }

  findOne(id: string) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
