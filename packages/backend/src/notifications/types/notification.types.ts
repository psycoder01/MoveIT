import { Notification } from "src/notifications/entities/notification.entity";

export interface NotificationWithOrganization extends Notification {
  organization: string;
}
