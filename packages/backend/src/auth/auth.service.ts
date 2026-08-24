import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { SignInDto } from "src/auth/dto/sign-in.dto";
import { AuthUser } from "src/auth/types/auth.types";

import { KeycloakService } from "src/services/keycloak/keycloak.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password, firstName, lastName } = signUpDto;

    const subId = await this.keycloakService.createUser({
      username,
      email,
      enabled: true,
      firstName,
      lastName,
      credentials: [{ value: password, temporary: false, type: "password" }],
    });

    const user: AuthUser = {
      id: subId,
      email,
      username,
       password_hash: password,
      full_name: `${firstName} ${lastName}`,
    };
    await this.usersService.create(user);

    return user;
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const token = await this.keycloakService.login(username, password);

    return {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  async signout(refreshToken: string) {
    return this.keycloakService.logout(refreshToken);
  }

  async getUser(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) throw new NotFoundException("User not found.");

    return user;
  }
}
