import { IsString } from "class-validator";

export class TurnDto {
  @IsString()
  rawResult: string;
}
