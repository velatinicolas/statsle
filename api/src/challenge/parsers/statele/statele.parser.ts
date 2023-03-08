import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import {
  countOccurrences,
  extractData,
  findLine,
  getLine,
} from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { StateleScoreInterface } from "./statele-score.interface";

@Injectable()
export class StateleParser
  implements TurnParserInterface<StateleScoreInterface>
{
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
    let score = "";
    let percentage = "";
    let bonusScore: number;

    try {
      score = extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      percentage = extractData(getLine(rawResult, 1), /[0-9]+%/);
    }

    try {
      const bonus = findLine(rawResult, /⭐/, false) || findLine(rawResult, /🏙️/, false) ||findLine(rawResult, /🪙/, false) || findLine(rawResult, /📏/);
      bonusScore = countOccurrences(bonus, "⭐");
      bonusScore += countOccurrences(bonus, "🏙️");
      bonusScore += countOccurrences(bonus, "🪙");
      bonusScore += countOccurrences(bonus, "📏");
    } catch {
      bonusScore = 0;
    }

    return `${score || percentage} bonus ${bonusScore}/6`;
  }

  extractDetailedScore(rawResult: string): StateleScoreInterface | null {
    let score = "";
    let percentage = 100;
    let bonusScore: number;

    try {
      score = extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      percentage = +extractData(extractData(getLine(rawResult, 1), /[0-9]+%/), /[0-9]+/);
    }

    try {
      const bonus = findLine(rawResult, /⭐/, false) || findLine(rawResult, /🏙️/, false) ||findLine(rawResult, /🪙/, false) || findLine(rawResult, /📏/);
      bonusScore = countOccurrences(bonus, "⭐");
      bonusScore += countOccurrences(bonus, "🏙️");
      bonusScore += countOccurrences(bonus, "🪙");
      bonusScore += countOccurrences(bonus, "📏");
    } catch {
      bonusScore = 0;
    }

    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      attemptsOver: +extractData(getLine(rawResult, 1), /[0-9]+/, percentage === 100 ? 3 : 2),
      percentage,
      bonuses: bonusScore,
      bonusesOver: 6,
    };
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractDetailedScore(rawResult)?.percentage === 100
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
