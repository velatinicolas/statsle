import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { map, Observable } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string): Observable<Omit<User, 'password'>> {
    return this.authService.validateUser(username, password)
      .pipe(
        map(user => {
          if (!user) {
            throw new UnauthorizedException()
          }

          return user
        })
      )
  }
}