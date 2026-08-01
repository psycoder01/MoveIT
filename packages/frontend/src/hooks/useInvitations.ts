import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteUser } from "src/api/invitations";
import { organizationKeys } from "@/hooks/useOrganization";

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
};
