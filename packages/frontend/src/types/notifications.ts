type NotificationType = "default" | "invitation";

export interface NotificationWithMetadata {
  id: string;
  user_id: string;
  organization: string;
  reference_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}
