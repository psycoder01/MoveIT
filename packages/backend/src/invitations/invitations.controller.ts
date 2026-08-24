import { Req, Controller, Post, Body, Param, UseGuards } from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { CreateInvitationDto } from "./dto/create-invitation.dto";

import { type AuthRequest } from "src/auth/types/types";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";
import { InvitationStatus } from "./types";

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

  @Post("/:invitationId/:status")
  @UseGuards(KeycloakAuthGuard)
  async accept(
    @Req() req: AuthRequest,
    @Param("invitationId") invitationId: string,
    @Param("status") status: InvitationStatus,
  ) {
    if (!req.user) throw Error("Invalid bearer token.");

    await this.invitationsService.updateInvitation(
      { invitationId, status },
      req.user?.userId,
    );
    return {
      message: "Invitation updated successfully.",
      data: null,
    };
  }
}
