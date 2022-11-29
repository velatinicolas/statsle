import { User } from "./user/user.entity";

export interface PassportRequest extends Request {
  user: User
}