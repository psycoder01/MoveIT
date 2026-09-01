import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Delete,
  Req,
} from "@nestjs/common";
import { OrganizationsService } from "src/organizations/organizations.service";
import { CreateOrganizationDto } from "src/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "src/organizations/dto/update-organization.dto";
import { organizationMapper } from "src/organizations/mappers/organization.mapper";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";
import { OrganizationMemberRole } from "src/organizations/types/organization.types";
import { type AuthRequest } from "src/auth/types/auth.types";

@Controller("organization")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(KeycloakAuthGuard)
  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Req() req: AuthRequest,
  ) {
    if (!req?.user) throw Error("No tokens.");
    try {
      const org = await this.organizationsService.create(
        createOrganizationDto,
        req.user.userId,
      );
      const data = organizationMapper.toDto(org);

      await this.organizationsService.addMember(
        org.id,
        req.user.userId,
        OrganizationMemberRole.admin,
      );

      return { message: "Organization created successfully.", data };
    } catch (e) {
      console.log({ e });
    }
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

  @UseGuards(KeycloakAuthGuard)
  @Get(":organizationId/members")
  async getMembers(@Param("organizationId") organizationId: string) {
    const members = await this.organizationsService.getMembers(organizationId);
    const data = members.map((member) => ({
      userId: member.user_id,
      role: member.role,
      created_at: member.created_at,
      updated_at: member.updated_at,
    }));

    return { message: "Organization members fetched successfully.", data };
  }

  @UseGuards(KeycloakAuthGuard)
  @Delete(":organizationId/members/:userId")
  async removeMember(
    @Param("organizationId") organizationId: string,
    @Param("userId") userId: string,
  ) {
    await this.organizationsService.removeMember(organizationId, userId);

    return {
      message: "User removed from organization successfully.",
      data: null,
    };
  }
}
