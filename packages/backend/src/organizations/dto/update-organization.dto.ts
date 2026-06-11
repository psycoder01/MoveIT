import { PartialType } from "@nestjs/mapped-types";
import { CreateOrganizationDto } from "src/organizations/dto/create-organization.dto";

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
