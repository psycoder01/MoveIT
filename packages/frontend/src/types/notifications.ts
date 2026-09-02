type NotificationType = "default" | "invitation";

export interface NotificationWithMetadata {
  id: string;
  userId: string;
  organization: string;
  referenceId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
