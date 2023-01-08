import { Body, Controller, Param, Post } from "@nestjs/common";
import { mergeMap, Observable } from "rxjs";
import { PasswordRecoveryMailService } from "src/mail/password-recovery-mail.service";
import { PasswordRecoveryDto } from "./password-recovery.dto";
import { UsePasswordRecoveryDto } from "./use-password-recovery.dto";
import { UserService } from "./user.service";

@Controller("password-recoveries")
export class PasswordRecoveryController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordRecoveryMailService: PasswordRecoveryMailService
  ) {}

  @Post()
  create(@Body() passwordRecovery: PasswordRecoveryDto): Observable<void> {
    return this.userService
      .buildPasswordRecovery(passwordRecovery.username)
      .pipe(
        mergeMap((passwordRecovery) =>
          this.passwordRecoveryMailService.sendMail(passwordRecovery)
        )
      );
  }

  @Post("/:identifier/use")
  use(
    @Param("identifier") identifier: string,
    @Body() usePasswordRecovery: UsePasswordRecoveryDto
  ): Observable<void> {
    return this.userService.usePasswordRecovery(
      identifier,
      usePasswordRecovery.token,
      usePasswordRecovery.newPassword
    );
  }
}
