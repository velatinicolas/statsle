import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  post(@Body() user: UserDto): Observable<void> {
    return this.userService.create(user.username, user.password, user.email);
  }
}
