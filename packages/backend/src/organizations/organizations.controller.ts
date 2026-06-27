import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Controller("organization")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    const org = await this.organizationsService.create(createOrganizationDto);

    return { message: "Organization created successfully.", data: org };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const org = await this.organizationsService.findOne(id);

    return { message: "Organization fetched successfully.", data: org };
  }

  @Get("/user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    const orgs = await this.organizationsService.findByUserId(userId);

    return { message: "Organizations fetched successfully.", data: orgs };
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    const org = await this.organizationsService.update(
      id,
      updateOrganizationDto,
    );

    return { message: "Organization updated successfully.", data: org };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const org = await this.organizationsService.remove(id);

    return { message: "Organization deleted successfully.", data: org };
  }
}
