import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { User } from './user.entity';
import { UserService } from './user.servce';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  post(@Body() user: Pick<User, 'pseudonym' | 'password' | 'email'>): Observable<void> {
    return this.userService.create(user.pseudonym, user.password, user.email)
      .pipe(map(() => void 0))
  }
}

