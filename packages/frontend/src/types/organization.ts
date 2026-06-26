export enum OrganizationPlan{
    FREE = "free", 
    BASIC = "basic",
    PRO = "pro",
    ENTERPRISE = "enterprise"
}

export interface Organization {
  name: string;
  slug: string;
  description: string;
  plan: OrganizationPlan;
  created_by: string;
}

export interface OrganizationWithMetadata extends Organization {
  id: string;
  logo_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateOrganization {
  name: string;
  slug: string;
  description: string;
}