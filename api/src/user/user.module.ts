import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { EncryptionModule } from "src/encryption/encryption.module";
import { MailModule } from "src/mail/mail.module";
import { PasswordRecovery } from "./password-recovery.entity";
import { PasswordRecoveryController } from "./password-recovery.controller";

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
