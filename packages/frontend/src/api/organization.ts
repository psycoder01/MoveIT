import { network } from "src/api/network";
import {
  type Organization,
  type OrganizationWithMetadata,
  type UpdateOrganization

} from "src/types/organization";

const routes = {
  organization: "organization",
  organizationById: (id: string) => `organization/${id}`,
  organizationByUserId: ( userId: string) =>
    `organization/user/${userId}`,
};


export const getOrganizationByUserId = async (
  userId: string,
): Promise<OrganizationWithMetadata[]> => {
  const response = await network.get(routes.organizationByUserId(userId));
  return response.json();
};

export const createOrganization = async (
  org: Organization,
): Promise<OrganizationWithMetadata> => {
  const response = await network.post(routes.organization, {
    json: org,
  });
  return response.json();
};

export const updateOrganization = async (
  id: string,
  org: UpdateOrganization,
): Promise<OrganizationWithMetadata> => {
  const response = await network.patch(routes.organizationById(id), {
    json: org,
  });
  return response.json();
};

export const deleteOrganization = async (id: string): Promise<void> => {
  const response = await network.delete(routes.organizationById(id));
  return response.json();
};