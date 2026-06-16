import { Injectable, UnauthorizedException } from "@nestjs/common";

import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { SignInDto } from "src/auth/dto/sign-in.dto";

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

    await this.keycloakService.createUser({
      username,
      email,
      enabled: true,
      firstName,
      lastName,
      credentials: [{ value: password, temporary: false, type: "password" }],
    });

    await this.usersService.create({
      email,
      username,
      password_hash: password,
      full_name: `${firstName} ${lastName}`,
    });

    return { message: "User created successfully" };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const token = await this.keycloakService.login(username, password);

    if (!token) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  async signout(refreshToken: string) {
    return this.keycloakService.logout(refreshToken);
  }
}
