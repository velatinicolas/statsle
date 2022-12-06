import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { JwtContentInterface } from "./jwt-content.interface";
import { UserService } from "src/user/user.service";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("JWT_PRIVATE_KEY") private readonly jwtPrivateKey: string,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtPrivateKey,
    });
  }

  // MUST return a Promise, Observable won't work
  validate(payload: JwtContentInterface): Promise<User> {
    // If we are here, JWT has been validated, so we can directly find the user by its name
    return firstValueFrom(
      this.userService.findOne(payload.username).pipe(
        map((user) => {
          if (!user) {
            throw new UnauthorizedException();
          }

          return user;
        })
      )
    );
  }
}
