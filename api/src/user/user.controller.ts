import { Body, Controller, Post } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UserDto } from "./user.dto";
import { UserResource } from "./user.resource";
import { UserService } from "./user.service";
import { UserTransformer } from "./user.transformer";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userTransformer: UserTransformer
  ) {}

  @Post()
  post(@Body() user: UserDto): Observable<UserResource> {
    return this.userService
      .create(user.username, user.password, user.email)
      .pipe(map((user) => this.userTransformer.transform(user)));
  }
}
