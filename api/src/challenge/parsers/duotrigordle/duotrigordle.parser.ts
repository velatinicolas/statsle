import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { DuotrigordleScoreInterface } from "./duotrigordle-score.interface";

@Injectable()
export class DuotrigordleParser
  implements TurnParserInterface<DuotrigordleScoreInterface>
{
  getChallengeName(): string {
    return "Duotrigordle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/Daily Duotrigordle #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `${detailedScore.attempts} / ${detailedScore.over}`;
    }

    return `${detailedScore.missed} missed`;
  }

  extractDetailedScore(rawResult: string): DuotrigordleScoreInterface {
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
