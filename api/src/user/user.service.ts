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

  create(username: string, password: string): Observable<User> {
    const user = this.userRepository.create({
      username,
      password,
    })

    return from(this.userRepository.save(user))
  }

  findOne(username: string): Observable<User | null> {
    return from(this.userRepository.findOneBy({ username }))
  }
}