export class NotificationDto {
  id: string;
  userId: string;
  referenceId: string;
  organization: string;
  type: string;
  title: string;
  message: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
