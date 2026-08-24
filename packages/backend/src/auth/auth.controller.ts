import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import e from "express";

import { AuthService } from "src/auth/auth.service";
import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { SignInDto } from "src/auth/dto/sign-in.dto";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";
import { type AuthRequest } from "src/auth/types/auth.types";
import { sessionMapper } from "src/auth/mappers/sessionUser.mapper";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    const data = sessionMapper.toSessionDto(user)
    
    return { message: "Signed up successfully.", data };
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    const tokens = await this.authService.signIn(signInDto);

    res.cookie("access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return { message: "Logged In successfully.", data: null };
  }

  @Delete("sign-out")
  async signout(
    @Req() req: e.Request,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    await this.authService.signout(req.cookies?.refresh_token);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return { message: "Logged out successfully.", data: null };
  }

  @UseGuards(KeycloakAuthGuard)
  @Get("session")
  async session(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) _: e.Response,
  ) {
    if (!req.user) throw Error("No user id.");
    
    const user = await this.authService.getUser(req.user.userId);
    const data = sessionMapper.toSessionDto(user)

    return { message: "Session details fetched successfully.", data };
  }
}
