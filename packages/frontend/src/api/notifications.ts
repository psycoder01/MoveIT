import { network } from "src/api/network";
import type { NotificationWithMetadata } from "@/types/notifications";
import { type Response } from "src/types/response";

const routes = {
  notificationsByUserId: (userId: string) => `notifications/user/${userId}`,
};

export const getNotificationsByUserId = async (
  userId: string,
): Promise<Response<NotificationWithMetadata[]>> => {
  const response = await network.get(routes.notificationsByUserId(userId));
  return response.json();
};
