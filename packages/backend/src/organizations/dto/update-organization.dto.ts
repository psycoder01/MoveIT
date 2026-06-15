import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

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
  @IsEnum(["free", "basic", "pro", "enterprise"])
  plan?: "free" | "basic" | "pro" | "enterprise";

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
