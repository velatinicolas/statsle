import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { JwtTokenInterface } from "./auth/jwt-token.interface";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { PassportRequest } from "./passport-request";
import { UserResource } from "./user/user.resource";
import { UserTransformer } from "./user/user.transformer";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userTransformer: UserTransformer
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  login(@Req() req: PassportRequest): JwtTokenInterface {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("auth/me")
  getProfile(@Req() req: PassportRequest): UserResource {
    return this.userTransformer.transform(req.user);
  }
}
