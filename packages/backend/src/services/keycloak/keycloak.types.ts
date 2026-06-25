export enum KeycloakGrantTypes {
  CLIENT_CREDENTIALS = "client_credentials",
  PASSWORD = "password",
}

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  session_state: string;
  scope: string;
}

export interface KeycloakErrorResponse {
  error: string;
  error_description?: string;
}

export interface KeycloakUserCredentials {
  type: string;
  value: string;
  temporary?: boolean;
}

export interface KeycloakUser {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  enabled?: boolean;
  credentials?: KeycloakUserCredentials[];
}

export interface KeycloakUserInfo {
  sub: string;
  username: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
}
