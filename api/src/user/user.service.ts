import { ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, mergeMap, Observable, tap } from "rxjs";
import { hash } from "src/auth/hash.helper";
import { Repository } from "typeorm";
import { User } from "./user.entity";

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(username: string, password: string): Observable<User> {
    return this.findOne(username).pipe(
      tap((existingUser) => {
        if (existingUser) {
          throw new ConflictException("This username already exists!");
        }
      }),
      mergeMap(() => {
        const user = this.userRepository.create({
          username,
          password: hash(password),
        });

        return from(this.userRepository.save(user));
      })
    );
  }

  findOne(username: string): Observable<User | null> {
    return from(this.userRepository.findOneBy({ username }));
  }
}
