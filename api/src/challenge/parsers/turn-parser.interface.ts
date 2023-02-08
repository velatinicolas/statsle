import { TurnResultEnum } from "../enums/turn-result.enum";

export interface TurnParserInterface<T = Record<string, any>> {
  getChallengeName(): string;
  handles(rawResult: string): boolean;
  extractGameNumber(rawResult: string): number;
  extractResult(rawResult: string): TurnResultEnum;
  extractScore(rawResult: string): string;
  extractDetailedScore(rawResult: string): T | null;
}
