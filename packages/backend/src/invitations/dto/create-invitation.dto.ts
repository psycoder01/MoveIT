import { IsUUID } from "class-validator";

export class CreateInvitationDto {
  @IsUUID()
  organization_id: string;

  @IsUUID()
  user_id: string;
}
