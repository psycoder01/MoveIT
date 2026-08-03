import { useQuery } from "@tanstack/react-query";
import { getNotificationsByUserId } from "src/api/notifications";

export const notificationsKeys = {
  all: ["notifications"] as const,
  byUserId: (userId: string) =>
    [...notificationsKeys.all, "user", userId] as const,
};

export const useGetNotificationsByUserId = (userId: string) => {
  return useQuery({
    queryKey: notificationsKeys.byUserId(userId),
    queryFn: () => getNotificationsByUserId(userId),
    enabled: !!userId,
  });
};
