import { ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, mergeMap, Observable, tap } from "rxjs";
import { hash } from "src/auth/hash.helper";
import { EncryptionService } from "src/encryption/encryption.service";
import { Repository } from "typeorm";
import { User } from "./user.entity";

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService
  ) {}

  create(username: string, password: string, email: string): Observable<User> {
    return this.findOneByUsername(username).pipe(
      tap((existingUser) => {
        if (existingUser) {
          throw new ConflictException("This username already exists!");
        }
      }),
      mergeMap(() => this.findOneByEmail(email)),
      tap((existingUser) => {
        if (existingUser) {
          throw new ConflictException("This email is already registered!");
        }
      }),
      mergeMap(() => {
        const user = this.userRepository.create({
          username,
          password: hash(password),
          email: this.encryptionService.encrypt(email),
        });

        return from(this.userRepository.save(user));
      })
    );
  }

  findOneByUsername(username: string): Observable<User | null> {
    return from(this.userRepository.findOneBy({ username }));
  }

  findOneByEmail(email: string): Observable<User | null> {
    return from(this.userRepository.findOneBy({ email }));
  }
}
