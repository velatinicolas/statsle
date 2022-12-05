import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtTokenInterface } from './jwt-token.interface';
import { compare } from './hash.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string): Observable<Omit<User, 'password'> | null> {
    return this.userService.findOne(username)
      .pipe(map(user => {
        if (user && compare(password, user.password)) {
          const { password, ...result } = user
          return result
        }
        return null
      }))
  }

  login(user: User): JwtTokenInterface {
    const payload = { username: user.username, sub: user.identifier }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}