import { useQuery } from "@tanstack/react-query";
import { getOrganizationMembers } from "src/api/organization";

export const organizationMembersKeys = {
  all: ["organizationMembers"] as const,
  byOrganizationId: (organizationId: string) =>
    [...organizationMembersKeys.all, organizationId] as const,
};

export const useGetOrganizationMembers = (organizationId: string) => {
  return useQuery({
    queryKey: organizationMembersKeys.byOrganizationId(organizationId),
    queryFn: () => getOrganizationMembers(organizationId),
    enabled: !!organizationId,
  });
};