import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { firstValueFrom, map } from "rxjs";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "../services/auth.service";

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
