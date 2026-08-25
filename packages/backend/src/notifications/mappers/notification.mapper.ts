import { NotificationDto } from "src/notifications/dto/notifications.dto";
import { NotificationWithOrganization } from "../types/notification.types";

export const notificationMapper = {
  toDto: (notification: NotificationWithOrganization): NotificationDto => ({
    id: notification.id,
    type: notification.type,
    organization: notification.organization,
    userId: notification.user_id,
    referenceId: notification.reference_id,
    title: notification.title,
    message: notification.message || "",
    isRead: notification.is_read,
    createdAt: notification.created_at.toString(),
    updatedAt: notification.updated_at.toString(),
  }),
};
