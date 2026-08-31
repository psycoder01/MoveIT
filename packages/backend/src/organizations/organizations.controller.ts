import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { OrganizationsService } from "src/organizations/organizations.service";
import { CreateOrganizationDto } from "src/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "src/organizations/dto/update-organization.dto";
import { organizationMapper } from "src/organizations/mappers/organization.mapper";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";

@Controller("organization")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(KeycloakAuthGuard)
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    const org = await this.organizationsService.create(createOrganizationDto);
    const data = organizationMapper.toDto(org);

    return { message: "Organization created successfully.", data };
  }

  @UseGuards(KeycloakAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const org = await this.organizationsService.findOne(id);

    return { message: "Organization fetched successfully.", data: org };
  }

  @UseGuards(KeycloakAuthGuard)
  @Get("/user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    const orgs = await this.organizationsService.findByUserId(userId);
    const data = orgs.map((org) => organizationMapper.toDto(org));

    return { message: "Organizations fetched successfully.", data };
  }

  @UseGuards(KeycloakAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    const org = await this.organizationsService.update(
      id,
      updateOrganizationDto,
    );
    const data = organizationMapper.toDto(org);

    return { message: "Organization updated successfully.", data };
  }

  @UseGuards(KeycloakAuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const org = await this.organizationsService.remove(id);
    const data = organizationMapper.toDto(org);

    return { message: "Organization deleted successfully.", data };
  }
}
