export enum InvitationStatus {
  pending = "pending",
  accepted = "accepted",
  declined = "declined",
  expired = "expired",
}

export interface UpdateInvitation {
  invitationId: string;
  status: InvitationStatus;
}
