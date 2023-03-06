import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, findLine, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class StateleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Statele";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#Statele #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      const score = extractData(
        getLine(rawResult, 1),
        /[0-9]+\/[0-9]+/
      );

      try {
        const bonus = findLine(rawResult, /⭐/);
        let bonusScore = countOccurrences(bonus, "⭐");
        bonusScore += countOccurrences(bonus, "🏙️");
        bonusScore += countOccurrences(bonus, "🪙");
        bonusScore += countOccurrences(bonus, "📏");
        return score + ` bonus ${bonusScore}/6`;
      } catch (error) {
        return score + " bonus 0/6";
      }
    } catch {
      return extractData(getLine(rawResult, 1), /[0-9]+%/);
    }
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult).includes("bonus")
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
