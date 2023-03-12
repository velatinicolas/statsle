import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { SedecorderScoreInterface } from "./sedecorder-score.interface";

@Injectable()
export class SedecorderParser
  implements TurnParserInterface<SedecorderScoreInterface>
{
  getChallengeName(): string {
    return "Sedecorder";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/Sedec-order/) !== null;
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

  extractDetailedScore(rawResult: string): SedecorderScoreInterface {
    let redSquares = 0;
    for (let lineNumber = 3; lineNumber <= 10; lineNumber++) {
      redSquares += countOccurrences(getLine(rawResult, lineNumber), "🟥");
    }

    if (redSquares > 0) {
      return {
        missed: redSquares / 2,
        attempts: +extractData(getLine(rawResult, 2), /[0-9]+/, 1),
        over: +extractData(getLine(rawResult, 2), /[0-9]+/, 1),
        result: TurnResultEnum.LOST,
      };
    }

    return {
      missed: 0,
      attempts: +extractData(getLine(rawResult, 2), /[0-9]+/, 1),
      over: +extractData(getLine(rawResult, 2), /[0-9]+/, 2),
      result: TurnResultEnum.WON,
    };
  }
}
