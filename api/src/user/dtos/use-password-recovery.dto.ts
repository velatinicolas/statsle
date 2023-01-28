import { IsString, MinLength } from "class-validator";

export class UsePasswordRecoveryDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
