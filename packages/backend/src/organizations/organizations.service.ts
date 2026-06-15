import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Organization } from "src/organizations/entities/organization.entity";
import { CreateOrganizationDto } from "src/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "src/organizations/dto/update-organization.dto";

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationsRepository.create(
      createOrganizationDto,
    );
    return this.organizationsRepository.save(organization);
  }

  findAll() {
    return this.organizationsRepository.find();
  }

  async findOne(id: string) {
    const organization = await this.organizationsRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async findByUserId(userId: string) {
    const organization = await this.organizationsRepository.findOne({
      where: { created_by: userId },
    });
    if (!organization) {
      throw new NotFoundException(
        `Organizations with user id ${userId} not found`,
      );
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.findOne(id);
    Object.assign(organization, updateOrganizationDto);
    return this.organizationsRepository.save(organization);
  }

  async remove(id: string) {
    const organization = await this.findOne(id);
    return this.organizationsRepository.remove(organization);
  }
}
