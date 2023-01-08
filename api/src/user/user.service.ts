import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { forkJoin, from, map, mergeMap, Observable, tap } from "rxjs";
import { compare, hash } from "src/auth/hash.helper";
import { EncryptionService } from "src/encryption/encryption.service";
import { Repository } from "typeorm";
import { PasswordRecovery } from "./password-recovery.entity";
import { User } from "./user.entity";

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordRecovery)
    private readonly passwordRecoveryRepository: Repository<PasswordRecovery>,
    private readonly encryptionService: EncryptionService
  ) {}

  create(username: string, password: string, email: string): Observable<void> {
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
          email: this.encryptionService.encrypt(email),
        });

        return from(this.userRepository.save(user));
      }),
      map(() => void 0)
    );
  }

  findOne(username: string): Observable<User | null> {
    return from(this.userRepository.findOneBy({ username })).pipe(
      tap((user) => {
        if (user) {
          user.email = this.encryptionService.decrypt(user.email);
        }
      })
    );
  }

  buildPasswordRecovery(username: string): Observable<PasswordRecovery> {
    return this.findOne(username).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException("User not found");
        }

        return user;
      }),
      mergeMap((user) => {
        const recoveryToken =
          this.encryptionService.generatePasswordRecoveryToken();

        const passwordRecovery = new PasswordRecovery();
        passwordRecovery.unhashedToken = recoveryToken;
        passwordRecovery.token = hash(recoveryToken);
        passwordRecovery.expiresAt = new Date(Date.now() + 30 * 60 * 1000); // Expires in 30 minutes
        passwordRecovery.user = user;

        return from(this.passwordRecoveryRepository.save(passwordRecovery));
      })
    );
  }

  usePasswordRecovery(
    identifier: string,
    token: string,
    newPassword: string
  ): Observable<void> {
    return from(
      this.passwordRecoveryRepository.findOne({
        where: {
          identifier: identifier,
        },
        relations: ["user"],
      })
    ).pipe(
      mergeMap((passwordRecovery) => {
        if (!passwordRecovery) {
          throw new NotFoundException();
        }

        if (!compare(token, passwordRecovery.token)) {
          throw new ForbiddenException("Invalid token");
        }

        if (passwordRecovery.usedAt) {
          throw new ForbiddenException("Token already used");
        }

        if (new Date(passwordRecovery.expiresAt) < new Date()) {
          throw new ForbiddenException("Token expired");
        }

        passwordRecovery.user.password = hash(newPassword);
        passwordRecovery.usedAt = new Date();

        return forkJoin([
          from(this.userRepository.save(passwordRecovery.user)),
          from(this.passwordRecoveryRepository.save(passwordRecovery)),
        ]);
      }),
      map(() => void 0)
    );
  }
}
