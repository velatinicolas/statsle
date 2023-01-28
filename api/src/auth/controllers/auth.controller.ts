import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { JwtTokenInterface } from "../interfaces/jwt-token.interface";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { PassportRequest } from "../interfaces/passport-request.interface";
import { UserResource } from "../../user/resources/user.resource";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: PassportRequest): JwtTokenInterface {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Req() req: PassportRequest): UserResource {
    return new UserResource(req.user);
  }
}
