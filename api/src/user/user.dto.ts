import { IsString, MinLength } from "class-validator";

export class UserDto {
  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
