import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { SedecordleScoreInterface } from "./sedecordle-score.interface";

@Injectable()
export class SedecordleParser
  implements TurnParserInterface<SedecordleScoreInterface>
{
  getChallengeName(): string {
    return "Sedecordle";
  }

  handles(rawResult: string): boolean {
    if (!getLine(rawResult, 11)) {
      return false;
    }

    return getLine(rawResult, 11).match(/^#sedecordle$/) !== null;
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

  extractDetailedScore(rawResult: string): SedecordleScoreInterface {
    let redSquares = 0;
    for (let lineNumber = 2; lineNumber <= 9; lineNumber++) {
      redSquares += countOccurrences(getLine(rawResult, lineNumber), "🟥");
    }

    if (redSquares > 0) {
      return {
        missed: redSquares / 2,
        attempts: 21,
        over: 21,
        result: TurnResultEnum.LOST,
      };
    }

    const scores: [number, RegExp][] = [
      [21, /2️⃣1️⃣/],
      [20, /2️⃣0️⃣/],
      [19, /1️⃣9️⃣/],
      [18, /1️⃣8️⃣/],
      [17, /1️⃣7️⃣/],
      [16, /1️⃣6️⃣/],
    ];

    for (const [score, regex] of scores) {
      for (let lineNumber = 2; lineNumber <= 9; lineNumber++) {
        if (getLine(rawResult, lineNumber).match(regex)) {
          return {
            missed: 0,
            attempts: score,
            over: 21,
            result: TurnResultEnum.WON,
          };
        }
      }
    }

    throw new Error("Unable to extract score");
  }
}
