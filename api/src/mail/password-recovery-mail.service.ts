import { Inject, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { PasswordRecovery } from "src/user/password-recovery.entity";
import { MailSender } from "./mail-sender.service";

@Injectable()
export class PasswordRecoveryMailService {
  constructor(
    private readonly mailSender: MailSender,
    @Inject("FRONT_BASE_URL")
    private readonly frontBaseUrl: string
  ) {}

  sendMail(passwordRecovery: PasswordRecovery): Observable<void> {
    if (!passwordRecovery.user.email) {
      throw new Error("No email defined on user");
    }

    const recoveryUrl = `${this.frontBaseUrl}/#/recover-password/${
      passwordRecovery.identifier}/${encodeURIComponent(passwordRecovery.unhashedToken)}`;

    return this.mailSender
      .sendMail(
        passwordRecovery.user.email,
        "Statsle password recovery",
        `Hello ${passwordRecovery.user.username}, <a href="${recoveryUrl}">click here</a> to define a new password for your Statsle account.`
      )
      .pipe(
        tap(() => {
          // Just to be sure that the unhashed token does not live in memory after the operation
          passwordRecovery.unhashedToken = "";
        })
      );
  }
}
