import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { map, Observable } from "rxjs";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/services/user.service";
import { JwtTokenInterface } from "../interfaces/jwt-token.interface";
import { compare } from "../helpers/hash.helper";
import { JwtContentInterface } from "../interfaces/jwt-content.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  validateUser(username: string, password: string): Observable<User | null> {
    return this.userService.findOne(username).pipe(
      map((user) => {
        if (user && compare(password, user.password)) {
          return user;
        }
        return null;
      })
    );
  }

  login(user: User): JwtTokenInterface {
    const jwtContent: JwtContentInterface = {
      username: user.username,
      sub: user.identifier,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(jwtContent),
    };
  }
}
