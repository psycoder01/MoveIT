import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { CreateInvitationDto } from "./dto/create-invitation.dto";

import { type AuthRequest } from "src/auth/types/types";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";

@Controller("invitations")
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  @UseGuards(KeycloakAuthGuard)
  async create(
    @Req() req: AuthRequest,
    @Body() createInvitationDto: CreateInvitationDto,
  ) {
    if (!req.user) throw Error("Invalid bearer token.");

    return this.invitationsService.create(createInvitationDto, req.user.userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.invitationsService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.invitationsService.remove(+id);
  }
}
