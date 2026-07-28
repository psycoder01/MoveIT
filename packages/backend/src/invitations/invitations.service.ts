import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateInvitationDto } from "./dto/create-invitation.dto";
import { Invitation } from "src/invitations/entities/invitation.entity";
import { OrganizationsService } from "src/organizations/organizations.service";
import { UsersService } from "src/users/users.service";
import { invitationEvents } from "src/configs/kafka/kafka.events";

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @Inject("KAFKA_CLIENT")
    private readonly kafkaClient: ClientKafka,
    private readonly userService: UsersService,
    private readonly organizationService: OrganizationsService,
  ) {}

  async create(createInvitationDto: CreateInvitationDto, userId: string) {
    const organization =
      await this.organizationService.findByOrganizationIdAndCreatedBy(
        createInvitationDto.organization_id,
        userId,
      );

    if (!organization) throw Error("Organization or creator does not exist.");

    const user = await this.userService.findById(createInvitationDto.user_id);
    if (!user) throw Error("Invited user does not exist.");

    const existInvitation = await this.invitationRepository.findOne({
      where: {
        organization_id: createInvitationDto.organization_id,
        user_id: createInvitationDto.user_id,
      },
    });

    if (existInvitation) throw Error("Invitation already exist.");

    const invitation = await this.invitationRepository.save({
      ...createInvitationDto,
      created_by: userId,
    });

    this.kafkaClient.emit(invitationEvents.created, {
      ...invitation,
      type: "invitation",
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
