import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class QuordleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Quordle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/Daily Quordle [0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const firstScoreLine = getLine(rawResult, 2);
    const secondScoreLine = getLine(rawResult, 3);

    let redSquares = 0;
    redSquares += countOccurrences(getLine(rawResult, 2), "🟥");
    redSquares += countOccurrences(getLine(rawResult, 3), "🟥");

    if (redSquares > 0) {
      return `${redSquares} missed`;
    }

    const highestOnFirstScoreLine =
      9 -
      ["9️⃣", "8️⃣", "7️⃣", "6️⃣", "5️⃣", "4️⃣", "3️⃣", "2️⃣", "1️⃣"].findIndex(
        (score) => firstScoreLine.includes(score)
      );
    const highestOnSecondScoreLine =
      9 -
      ["9️⃣", "8️⃣", "7️⃣", "6️⃣", "5️⃣", "4️⃣", "3️⃣", "2️⃣", "1️⃣"].findIndex(
        (score) => secondScoreLine.includes(score)
      );
    const score = Math.max(highestOnFirstScoreLine, highestOnSecondScoreLine);

    return `${score} / 9`;
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult).includes("missed")
      ? TurnResultEnum.LOST
      : TurnResultEnum.WON;
  }
}
