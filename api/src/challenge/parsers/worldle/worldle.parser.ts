import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import {
  countOccurrences,
  extractData,
  findLine,
  getLine,
} from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { WorldleScoreInterface } from "./worldle-score.interface";

@Injectable()
export class WorldleParser
  implements TurnParserInterface<WorldleScoreInterface>
{
  getChallengeName(): string {
    return "Worldle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#Worldle #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      const score = extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);

      try {
        const bonus = findLine(rawResult, /⭐/);
        let bonusScore = countOccurrences(bonus, "⭐");
        bonusScore += countOccurrences(bonus, "🏙️");
        bonusScore += countOccurrences(bonus, "🪙");
        return score + ` bonus ${bonusScore}/5`;
      } catch (error) {
        return score + " bonus 0/5";
      }
    } catch {
      return extractData(getLine(rawResult, 1), /[0-9]+%/);
    }
  }

  extractDetailedScore(rawResult: string): WorldleScoreInterface | null {
    try {
      extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      return {
        attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
        attemptsOver: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
        percentage: +extractData(getLine(rawResult, 1), /[0-9]+/, 3),
        bonuses: 0,
        bonusesOver: 5,
      };
    }

    const bonus = findLine(rawResult, /⭐/);
    let bonusScore = countOccurrences(bonus, "⭐");
    bonusScore += countOccurrences(bonus, "🏙️");
    bonusScore += countOccurrences(bonus, "🪙");

    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      attemptsOver: +extractData(getLine(rawResult, 1), /[0-9]+/, 3),
      percentage: 100,
      bonuses: bonusScore,
      bonusesOver: 5,
    };
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult).includes("bonus")
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
