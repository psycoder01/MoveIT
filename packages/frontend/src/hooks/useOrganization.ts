import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizationByUserId,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "src/api/organization";
import type { Organization, UpdateOrganization } from "src/types/organization";

export const organizationKeys = {
  all: ["organizations"] as const,
  byUserId: (userId: string) =>
    [...organizationKeys.all, "user", userId] as const,
  byId: (id: string) => [...organizationKeys.all, "id", id] as const,
};

export const useGetOrganizationsByUserId = (userId: string) => {
  return useQuery({
    queryKey: organizationKeys.byUserId(userId),
    queryFn: () => getOrganizationByUserId(userId),
    enabled: !!userId,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (org: Organization) => createOrganization(org),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, org }: { id: string; org: UpdateOrganization }) =>
      updateOrganization(id, org),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
};
