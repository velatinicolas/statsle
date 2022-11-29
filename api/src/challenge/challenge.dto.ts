import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ChallengeDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUrl()
  @IsNotEmpty()
  url: string
}