import { Module, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailSender } from "./mail-sender.service";
import { PasswordRecoveryMailService } from "./password-recovery-mail.service";

function provideConfig(name: string): Provider {
  return {
    provide: name,
    useFactory: (configService: ConfigService) => configService.get(name),
    inject: [ConfigService],
  };
}

@Module({
  imports: [ConfigModule],
  providers: [
    provideConfig("MAIL_TRANSPORT_HOST"),
    provideConfig("MAIL_TRANSPORT_PORT"),
    provideConfig("MAIL_TRANSPORT_USER"),
    provideConfig("MAIL_TRANSPORT_PASS"),
    provideConfig("FRONT_BASE_URL"), // To send password recovery mail
    MailSender,
    PasswordRecoveryMailService,
  ],
  exports: [PasswordRecoveryMailService],
})
export class MailModule {}
