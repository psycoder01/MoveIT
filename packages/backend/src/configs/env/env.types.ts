export interface KeycloakOpenIDConnect {
  uri: string;
  realm: string;
  grantType: string;
  clientId: string;
  clientSecret: string;
}

export interface EnvVariables {
  port: number;
  db: string;
  keycloak: KeycloakOpenIDConnect;
}
