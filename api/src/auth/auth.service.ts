import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  validateUser(username: string, password: string): Observable<Omit<User, 'password'> | null> {
    return this.userService.findOne(username)
      .pipe(map(user => {
        if (user && user.password === password) {
          const { password, ...result } = user
          return result
        }
        return null
      }))
  }
}