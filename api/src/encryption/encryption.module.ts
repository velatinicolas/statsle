import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EncryptionService } from "./encryption.service";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "ENCRYPTION_KEY",
      useFactory: (configService: ConfigService) =>
        configService.get("ENCRYPTION_KEY"),
      inject: [ConfigService],
    },
    EncryptionService,
  ],
  exports: [EncryptionService],
})
export class EncryptionModule {}
