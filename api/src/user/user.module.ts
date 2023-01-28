import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { EncryptionModule } from "src/encryption/encryption.module";
import { MailModule } from "src/mail/mail.module";
import { PasswordRecovery } from "./entities/password-recovery.entity";
import { PasswordRecoveryController } from "./controllers/password-recovery.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PasswordRecovery]),
    EncryptionModule,
    MailModule,
  ],
  controllers: [UserController, PasswordRecoveryController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
