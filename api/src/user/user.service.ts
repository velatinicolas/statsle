import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable, of } from "rxjs";
import { hash } from "src/auth/hash.helper";
import { Repository } from "typeorm";
import { User } from "./user.entity";

export class UserService
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(username: string, password: string): Observable<User> {
    const user = this.userRepository.create({
      username,
      password: hash(password),
    })

    return from(this.userRepository.save(user))
  }

  findOne(username: string): Observable<User | null> {
    return from(this.userRepository.findOneBy({ username }))
  }
}