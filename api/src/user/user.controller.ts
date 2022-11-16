import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  post(@Body() user: Pick<User, 'username' | 'password'>): Observable<void> {
    return this.userService.create(user.username, user.password)
      .pipe(map(() => void 0))
  }
}

