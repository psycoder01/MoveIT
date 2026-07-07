import { network } from "src/api/network";
import {
  type Organization,
  type OrganizationWithMetadata,
  type UpdateOrganization,
} from "src/types/organization";
import { type Response } from "src/types/response";

const routes = {
  organization: "organization",
  organizationById: (id: string) => `organization/${id}`,
  organizationByUserId: (userId: string) => `organization/user/${userId}`,
};

export const getOrganizationByUserId = async (
  userId: string,
): Promise<Response<OrganizationWithMetadata[]>> => {
  const response = await network.get(routes.organizationByUserId(userId));
  return response.json();
};

export const getOrganizationById = async (
  id: string,
): Promise<Response<OrganizationWithMetadata>> => {
  const response = await network.get(routes.organizationById(id));
  return response.json();
};

export const createOrganization = async (
  org: Organization,
): Promise<Response<OrganizationWithMetadata>> => {
  const response = await network.post(routes.organization, {
    json: org,
  });
  return response.json();
};

export const updateOrganization = async (
  id: string,
  org: UpdateOrganization,
): Promise<Response<OrganizationWithMetadata>> => {
  const response = await network.patch(routes.organizationById(id), {
    json: org,
  });
  return response.json();
};

export const deleteOrganization = async (
  id: string,
): Promise<Response<void>> => {
  const response = await network.delete(routes.organizationById(id));
  return response.json();
};
