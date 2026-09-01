import { Notification } from "src/notifications/entities/notification.entity";

export interface NotificationWithOrganization extends Notification {
  organization: string;
}

export enum NotificationType {
  DEFAULT = "DEFAULT",
  ORG_INVITATION = "ORG_INVITATION",
  BOARD_ASSIGNED = "BOARD_ASSIGNED",
  CARD_ASSIGNED = "CARD_ASSIGNED",
  CARD_MOVED = "CARD_MOVED",
  CARD_UPDATED = "CARD_UPDATED",
  COMMENT_ADDED = "COMMENT_ADDED",
}
