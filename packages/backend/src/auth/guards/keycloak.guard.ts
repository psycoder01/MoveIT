import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { KeycloakService } from "src/services/keycloak/keycloak.service";

@Injectable()
export class KeycloakAuthGuard extends AuthGuard("keycloak") {
  constructor(private readonly keycloakService: KeycloakService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    try {
      return (await super.canActivate(context)) as boolean;
    } catch (err) {
      const refreshToken = req.cookies?.refresh_token;

      if (!refreshToken) {
        throw new UnauthorizedException("No refresh token");
      }

      try {
        const tokens = await this.keycloakService.refreshToken(refreshToken);

        res.cookie("access_token", tokens.access_token, {
          httpOnly: true,
          sameSite: "lax",
          secure: true,
        });
        res.cookie("refresh_token", tokens.refresh_token, {
          httpOnly: true,
          sameSite: "lax",
          secure: true,
        });

        return (await super.canActivate(context)) as boolean;
      } catch (refreshErr) {
        throw new UnauthorizedException("Session expired");
      }
    }
  }
}
