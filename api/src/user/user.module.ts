import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { EncryptionModule } from "src/encryption/encryption.module";
import { UserTransformer } from "./user.transformer";

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptionModule],
  controllers: [UserController],
  providers: [UserService, UserTransformer],
  exports: [UserService, UserTransformer],
})
export class UserModule {}
