import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
} from "class-validator";

import { OrganizationPlan } from "../organizations.types";

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsEnum(OrganizationPlan)
  plan: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsUUID()
  created_by: string;
}
