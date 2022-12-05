import { Body, Controller, Post } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UserDto } from "./user.dto";
import { UserResource } from "./user.resource";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  post(@Body() user: UserDto): Observable<UserResource> {
    return this.userService
      .create(user.username, user.password)
      .pipe(map((user) => new UserResource(user)));
  }
}
