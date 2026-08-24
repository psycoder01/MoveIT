import { network } from "src/api/network";
import { type Response } from "src/types/response";

export interface InviteUserPayload {
  organization_id: string;
  user_id: string;
}

export enum InvitationStatus {
  accepted = "accepted",
  declined = "declined"
}

const routes = {
  invitations: "invitations",
  acceptOrDeclineInvitation: (invitationId: string, status: InvitationStatus) => `/invitations/${invitationId}/${status}`
};


export const inviteUser = async (
  payload: InviteUserPayload,
): Promise<Response<void>> => {
  const response = await network.post(routes.invitations, {
    json: payload,
  });

  return response.json();
};

export const acceptOrDeclineInvitation = async (
  id: string,
  status: InvitationStatus
): Promise<Response<void>> => {
  const response = await network.post(routes.acceptOrDeclineInvitation(id, status))

  return response.json()
}