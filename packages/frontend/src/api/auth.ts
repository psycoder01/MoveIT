import { network } from "src/api/network";
import {
  type LoginCredentials,
  type SignUpCredentials,
  type LoginResponse,
  type SignUpResponse,
  type SessionResponse,
} from "src/api/types";

const routes = {
  authSignIn: "auth/sign-in",
  authSignUp: "auth/sign-up",
  authSignOut: "auth/sign-out",
  session: "auth/session",
};

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await network.post(routes.authSignIn, {
    json: credentials,
  });

  return response.json();
};

export const signup = async (
  credentials: SignUpCredentials,
): Promise<SignUpResponse> => {
  const response = await network.post(routes.authSignUp, {
    json: credentials,
  });

  return response.json();
};

export const session = async (): Promise<SessionResponse> => {
  const response = await network.get(routes.session);
  return response.json();
};

export const signout = async (): Promise<void> => {
  const response = await network.post(routes.authSignOut);
  return response.json();
};
