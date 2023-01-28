import { User } from "../../user/entities/user.entity";

export interface PassportRequest extends Request {
  user: User;
}
