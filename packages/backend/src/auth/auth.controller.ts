import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import e from "express";

import { AuthService } from "src/auth/auth.service";
import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { SignInDto } from "src/auth/dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
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

    return { message: "Login successful" };
  }

  @Post("signout")
  async signout(
    @Req() req: e.Request,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    this.authService.signout(req.cookies?.refresh_token);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return { message: "Logout successful" };
  }
}
