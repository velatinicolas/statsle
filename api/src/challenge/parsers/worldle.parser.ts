import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class WorldleParser extends TurnParser {
  getChallengeName(): string {
    return "Worldle";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/#Worldle #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      const score = this.extractData(
        this.getLine(rawResult, 1),
        /[0-9]+\/[0-9]+/
      );

      try {
        const bonus = this.findLine(rawResult, /⭐/);
        let bonusScore = this.countOccurrences(bonus, "⭐");
        bonusScore += this.countOccurrences(bonus, "🏙️");
        bonusScore += this.countOccurrences(bonus, "🪙");
        return score + ` bonus ${bonusScore}/5`;
      } catch (error) {
        return score + " bonus 0/5";
      }
    } catch {
      return this.extractData(this.getLine(rawResult, 1), /[0-9]+%/);
    }
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult).includes("bonus")
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
