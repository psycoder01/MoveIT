export interface KeycloakOpenIDConnect {
  uri: string;
  realm: string;
  grantType: string;
  clientId: string;
  clientSecret: string;
  issuer: string;
}

export interface DbVariables {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  synchronize: string;
}

export interface EnvVariables {
  port: number;
  db: DbVariables;
  keycloak: KeycloakOpenIDConnect;
}
