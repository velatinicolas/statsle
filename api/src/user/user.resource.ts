import { Expose, plainToClass } from "class-transformer";

export class UserResource {
  constructor(user: Partial<UserResource>) {
    // excludeExtraneousValues MUST be used with all @Expose decorators
    return plainToClass(UserResource, user, { excludeExtraneousValues: true });
  }

  @Expose()
  identifier: string;

  @Expose()
  username: string;

  @Expose()
  email: string | null;

  @Expose()
  createdAt: Date;
}
