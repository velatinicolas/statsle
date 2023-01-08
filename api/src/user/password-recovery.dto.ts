import { IsString, IsUrl } from "class-validator";

export class PasswordRecoveryDto {
  @IsString()
  username: string;
}
