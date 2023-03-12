import { ScoreInterface } from "./score.interface";

export interface TurnParserInterface<T = ScoreInterface> {
  getChallengeName(): string;
  handles(rawResult: string): boolean;
  extractGameNumber(rawResult: string): number;
  extractScore(rawResult: string): string;
  extractDetailedScore(rawResult: string): T;
}
