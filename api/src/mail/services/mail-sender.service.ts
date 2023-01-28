import { Inject, Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import { from, map, Observable } from "rxjs";

@Injectable()
export class MailSender {
  constructor(
    @Inject("MAIL_TRANSPORT_HOST") private readonly mailTransportHost: string,
    @Inject("MAIL_TRANSPORT_PORT") private readonly mailTransportPort: string,
    @Inject("MAIL_TRANSPORT_USER") private readonly mailTransportUser: string,
    @Inject("MAIL_TRANSPORT_PASS") private readonly mailTransportPass: string
  ) {}

  sendMail(
    to: string | string[],
    subject: string,
    html: string
  ): Observable<void> {
    console.info(to);
    const transport = createTransport({
      host: this.mailTransportHost,
      port: +this.mailTransportPort,
      secure: +this.mailTransportPort === 465,
      auth: {
        user: this.mailTransportUser,
        pass: this.mailTransportPass,
      },
    });

    return from(
      transport.sendMail({
        from: '"Statsle" <no-reply@statsle.fr>',
        to,
        subject,
        html,
      })
    ).pipe(map(() => void 0));
  }
}
