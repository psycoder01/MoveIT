export enum OrganizationPlan {
  FREE = "free",
  BASIC = "basic",
  PRO = "pro",
  ENTERPRISE = "enterprise",
}

export interface Organization {
  name: string;
  slug: string;
  description: string;
  plan: OrganizationPlan;
  createdBy: string;
}

export interface OrganizationWithMetadata extends Organization {
  id: string;
  logoUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateOrganization {
  name: string;
  slug: string;
  description: string;
}
