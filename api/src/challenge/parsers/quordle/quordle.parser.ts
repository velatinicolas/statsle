import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { QuordleScoreInterface } from "./quordle-score.interface";

@Injectable()
export class QuordleParser
  implements TurnParserInterface<QuordleScoreInterface>
{
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
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `Attempts: ${detailedScore.attempts} / ${detailedScore.over}`;
    }

    return `Missed: ${detailedScore.missed}`;
  }

  extractDetailedScore(rawResult: string): QuordleScoreInterface {
    const firstScoreLine = getLine(rawResult, 2);
    const secondScoreLine = getLine(rawResult, 3);

    let redSquares = 0;
    redSquares += countOccurrences(getLine(rawResult, 2), "🟥");
    redSquares += countOccurrences(getLine(rawResult, 3), "🟥");

    if (redSquares > 0) {
      return {
        attempts: 9,
        over: 9,
        missed: redSquares,
        result: TurnResultEnum.LOST,
      };
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

    return {
      attempts: score,
      over: 9,
      missed: 0,
      result: TurnResultEnum.WON,
    };
  }
}
