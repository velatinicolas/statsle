import { TurnResultEnum } from "../enums/turn-result.enum";

export interface TurnParserInterface {
  getChallengeName(): string;
  handles(rawResult: string): boolean;
  extractGameNumber(rawResult: string): number;
  extractResult(rawResult: string): TurnResultEnum;
  extractScore(rawResult: string): string;
}
