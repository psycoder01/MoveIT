import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

import { OrganizationPlan } from "../organizations.types";

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsEnum(OrganizationPlan)
  plan?: OrganizationPlan;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
