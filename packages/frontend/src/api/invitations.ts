import { network } from "src/api/network";
import { type Response } from "src/types/response";

const routes = {
  invitations: "invitations",
};

export interface InviteUserPayload {
  organization_id: string;
  user_id: string;
}

export const inviteUser = async (
  payload: InviteUserPayload,
): Promise<Response<void>> => {
  const response = await network.post(routes.invitations, {
    json: payload,
  });

  return response.json();
};
