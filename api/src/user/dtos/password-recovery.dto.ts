import { IsString } from "class-validator";

export class PasswordRecoveryDto {
  @IsString()
  username: string;
}
