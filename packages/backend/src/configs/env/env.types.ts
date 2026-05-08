export interface KeycloakOpenIDConnect {
  uri: string;
  realm: string;
  grantType: string;
  clientId: string;
  clientSecret: string;
  masterUsername: string;
  masterPassword: string;
}

export interface EnvVariables {
  port: number;
  db: string;
  keycloak: KeycloakOpenIDConnect;
}
