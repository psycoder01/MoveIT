/* eslint-disable */

import * as jwksRsa from "jwks-rsa";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DecodedUserDetails } from "src/auth/types/auth.types";

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, "keycloak") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => req?.cookies?.access_token,
      ]),

      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.KC_ISSUER}/protocol/openid-connect/certs`,
      }),
      algorithms: ["RS256"],
      issuer: process.env.KC_ISSUER,
    });
  }

  async validate(payload: any): Promise<DecodedUserDetails> {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.preferred_username,
      roles: payload.realm_access?.roles || [],
      raw: payload,
    };
  }
}
