/* eslint-disable @typescript-eslint/only-throw-error */
import { ConfigService } from "@nestjs/config";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";

import { HttpService } from "src/services/http/http.service";
import { EnvVariables } from "src/configs/env/env.types";
import {
  KeycloakUser,
  KeycloakTokenResponse,
  KeycloakGrantTypes,
  KeycloakUserInfo,
} from "./keycloak.types";

@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);
  private readonly baseUrl: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(
    private readonly configService: ConfigService<EnvVariables, any>,
    private readonly httpService: HttpService,
  ) {
    const keycloakConfig =
      this.configService.get<EnvVariables["keycloak"]>("keycloak");

    if (!keycloakConfig) throw new Error("Keycloak config is missing");

    this.baseUrl = keycloakConfig.uri;
    this.realm = keycloakConfig.realm;
    this.clientId = keycloakConfig.clientId;
    this.clientSecret = keycloakConfig.clientSecret;
  }

  private async getAdminToken(): Promise<string> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const body = new URLSearchParams({
      grant_type: KeycloakGrantTypes.CLIENT_CREDENTIALS,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    return this.httpService
      .post<KeycloakTokenResponse, string>(tokenUrl, body.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((resp) => resp.access_token);
  }

  async createUser(userData: KeycloakUser): Promise<string> {
    const token = await this.getAdminToken();
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users`;

    const response = await this.httpService.postAndResponeHeaders<void, string>(
      url,
      JSON.stringify(userData),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const locationHeader = response.headers.get("location");

    if (!locationHeader)
      throw new Error("Keycloak did not return Location header");

    const userId = locationHeader.split("/").pop();
    if (!userId) throw new Error("No sub id in the location header");

    return userId;
  }

  async login(
    username: string,
    password: string,
  ): Promise<KeycloakTokenResponse> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const body = new URLSearchParams({
      grant_type: KeycloakGrantTypes.PASSWORD,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      username,
      password,
    });

    const response = await this.httpService.post<
      KeycloakTokenResponse,
      BodyInit
    >(tokenUrl, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    this.logger.log(`User logged in: ${username}`);
    return response;
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/logout`;
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    });

    await this.httpService.post(tokenUrl, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    this.logger.log("User logged out");
  }

  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    });

    const response = await this.httpService.post<KeycloakTokenResponse, string>(
      tokenUrl,
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response;
  }

  async getUserInfo(accessToken: string): Promise<KeycloakUserInfo> {
    const userInfoUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/userinfo`;

    const response = await this.httpService.get<KeycloakUserInfo>(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }
}
