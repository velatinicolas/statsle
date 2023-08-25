import { DetailedScoreInterface } from "./detailed-score.interface";

export interface TurnParserInterface<T = DetailedScoreInterface> {
  getChallengeName(): string;
  handles(rawResult: string): boolean;
  extractGameNumber(rawResult: string): number;
  extractSummarizedScore(rawResult: string): string;
  extractDetailedScore(rawResult: string): T;
}
