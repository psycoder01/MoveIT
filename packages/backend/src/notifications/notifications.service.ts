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

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
