import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { firstValueFrom, map } from "rxjs";
import { User } from "src/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // MUST return a Promise, Observable won't work
  validate(username: string, password: string): Promise<User> {
    return firstValueFrom(
      this.authService.validateUser(username, password).pipe(
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
