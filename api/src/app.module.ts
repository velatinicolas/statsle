import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "typeorm-config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ChallengeModule } from "./challenge/challenge.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    ChallengeModule,
  ],
})
export class AppModule {}
