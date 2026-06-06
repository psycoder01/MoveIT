import { Injectable, UnauthorizedException } from "@nestjs/common";

import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { SignInDto } from "src/auth/dto/sign-in.dto";

import { KeycloakService } from "src/services/keycloak/keycloak.service";

@Injectable()
export class AuthService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password, firstName, lastName } = signUpDto;

    const user = await this.keycloakService.createUser({
      username,
      email,
      enabled: true,
      firstName,
      lastName,
      credentials: [{ value: password, temporary: false, type: "password" }],
    });

    return {
      message: "User registered successfully",
      user,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const token = await this.keycloakService.login(username, password);

    if (!token) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      message: "User signed in successfully",
      access_token: token,
    };
  }
}
