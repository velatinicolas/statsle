import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { JwtContentInterface } from "./jwt-content.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("JWT_PRIVATE_KEY") private readonly jwtPrivateKey: string
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtPrivateKey,
    });
  }

  async validate(payload: JwtContentInterface): Promise<Partial<User>> {
    return { identifier: payload.sub, username: payload.username };
  }
}
