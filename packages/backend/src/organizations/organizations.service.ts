import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Organization } from "src/organizations/entities/organization.entity";
import { OrganizationMember } from "src/organizations/entities/organization-members.entity";
import { OrganizationMemberRole } from "src/organizations/types/organization.types";
import { CreateOrganizationDto } from "src/organizations/dto/create-organization.dto";
import { UpdateOrganizationDto } from "src/organizations/dto/update-organization.dto";

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
    @InjectRepository(OrganizationMember)
    private organizationMembersRepository: Repository<OrganizationMember>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto, userId: string) {
    const organization = this.organizationsRepository.create({
      ...createOrganizationDto,
      created_by: userId,
    });
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
    const organizations = await this.organizationsRepository.find({
      where: { created_by: userId },
    });
    return organizations;
  }

  async findByOrganizationIdAndCreatedBy(
    organizationId: string,
    userId: string,
  ) {
    const organization = await this.organizationsRepository.findOne({
      where: { id: organizationId, created_by: userId },
    });
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

  async addMember(
    organizationId: string,
    userId: string,
    role: OrganizationMemberRole = OrganizationMemberRole.member,
  ) {
    const organizationMember = this.organizationMembersRepository.create({
      organization_id: organizationId,
      user_id: userId,
      role,
    });
    return this.organizationMembersRepository.save(organizationMember);
  }

  async getMembers(organizationId: string) {
    return this.organizationMembersRepository.find({
      where: { organization_id: organizationId },
      relations: { user: true },
    });
  }

  async removeMember(organizationId: string, userId: string) {
    const organizationMember = await this.organizationMembersRepository.findOne(
      {
        where: { organization_id: organizationId, user_id: userId },
        relations: { user: true, organization: true },
      },
    );
    if (!organizationMember) {
      throw new NotFoundException(`User not found in organization`);
    }
    return this.organizationMembersRepository.remove(organizationMember);
  }
}
