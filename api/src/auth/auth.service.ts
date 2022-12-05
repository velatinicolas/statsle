import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { map, Observable } from "rxjs";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { JwtTokenInterface } from "./jwt-token.interface";
import { compare } from "./hash.helper";
import { UserResource } from "src/user/user.resource";
import { JwtContentInterface } from "./jwt-content.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  validateUser(
    username: string,
    password: string
  ): Observable<UserResource | null> {
    return this.userService.findOne(username).pipe(
      map((user) => {
        if (user && compare(password, user.password)) {
          return new UserResource(user);
        }
        return null;
      })
    );
  }

  login(user: User): JwtTokenInterface {
    const jwtContent: JwtContentInterface = {
      username: user.username,
      sub: user.identifier,
    };

    return {
      access_token: this.jwtService.sign(jwtContent),
    };
  }
}