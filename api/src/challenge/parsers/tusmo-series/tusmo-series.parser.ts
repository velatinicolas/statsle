import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import {
  countOccurrences,
  extractData,
  findLines,
  getLine,
} from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { TusmoSeriesScoreInterface } from "./tusmo-series-score.interface";

@Injectable()
export class TusmoSeriesParser
  implements TurnParserInterface<TusmoSeriesScoreInterface>
{
  getChallengeName(): string {
    return "Tusmo suite";
  }

  handles(rawResult: string): boolean {
    return (
      getLine(rawResult, 1).match(
        /TUSMO \(@tusmo_xyz\) Suite de mots #[0-9]+/
      ) !== null
    );
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractSummarizedScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `Attempts: ${detailedScore.attempts}`;
    }

    return `Missed: ${detailedScore.over - detailedScore.words}`;
  }

  extractDetailedScore(rawResult: string): TusmoSeriesScoreInterface {
    let attempts = 0;
    for (let lineNumber = 3; lineNumber <= 6; lineNumber++) {
      attempts += countOccurrences(getLine(rawResult, lineNumber), "🔴");
    }

    const words = findLines(rawResult, /✅/).length;
    const over = findLines(rawResult, /[❌✅]/).length;

    return {
      words,
      over,
      attempts,
      result: words === over ? TurnResultEnum.WON : TurnResultEnum.LOST,
    };
  }
}
