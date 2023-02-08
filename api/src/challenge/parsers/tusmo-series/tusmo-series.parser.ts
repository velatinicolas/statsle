import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, findLines, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { TusmoSeriesScoreInterface } from "./tusmo-series-score.interface";

@Injectable()
export class TusmoSeriesParser implements TurnParserInterface<TusmoSeriesScoreInterface> {
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

  extractScore(rawResult: string): string {
    const totalWords = findLines(rawResult, /[❌✅]/).length;
    const wordsFound = findLines(rawResult, /✅/).length;

    return `${wordsFound} / ${totalWords}`;
  }

  extractDetailedScore(rawResult: string): TusmoSeriesScoreInterface | null {
    let attempts = 0;
    for (let lineNumber = 3; lineNumber <= 6; lineNumber++) {
      attempts += countOccurrences(
        getLine(rawResult, lineNumber),
        "🔴"
      );
    }

    return {
      words: findLines(rawResult, /✅/).length,
      over: findLines(rawResult, /[❌✅]/).length,
      attempts,
    }
  }

  extractResult(rawResult: string): TurnResultEnum {
    const score = this.extractScore(rawResult);

    return score.split(" / ")[0] === score.split(" / ")[1]
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
