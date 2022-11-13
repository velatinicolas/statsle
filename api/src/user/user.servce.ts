import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { User } from "./user.entity";

export class UserService
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(pseudonym: string, password: string, email: string): Observable<User> {
    const user = this.userRepository.create({
      pseudonym,
      password,
      email,
    })

    return from(this.userRepository.save(user))
  }
}