import { Expose } from "class-transformer";

export class UserResource {
  @Expose()
  identifier: string;

  @Expose()
  username: string;

  @Expose()
  email: string | null;

  @Expose()
  createdAt: Date;
}
