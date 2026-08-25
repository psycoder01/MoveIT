import { Organization } from "src/organizations/entities/organization.entity";
import { OrganizationDtO } from "src/organizations/dto/organization.dto";

export const organizationMapper = {
  toDto: (organization: Organization): OrganizationDtO => ({
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    description: organization.description,
    logoUrl: organization.logo_url,
    plan: organization.plan,
    createdBy: organization.created_by,
    createdAt: organization.created_at.toString(),
  }),
};
