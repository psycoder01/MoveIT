import { network } from "src/api/network";
import {
  type LoginCredentials,
  type SignUpCredentials,
  type LoginResponse,
  type SignUpResponse,
} from "src/api/types";

const routes = {
  authSignIn: "auth/sign-in",
  authSignUp: "auth/sign-up",
  authSignOut: "auth/sign-out",
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
