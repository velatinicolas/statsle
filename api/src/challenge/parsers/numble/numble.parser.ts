import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { NumbleScoreInterface } from "./numble-score.interface";

@Injectable()
export class NumbleParser implements TurnParserInterface<NumbleScoreInterface> {
  getChallengeName(): string {
    return "Numble";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/^Numble [0-9]+$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractSummarizedScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    let score = `Time: ${detailedScore.time}, numbers used: ${detailedScore.numbersUsed} / ${detailedScore.over}`;

    if (detailedScore.result === TurnResultEnum.LOST) {
      score += `, final answer: ${detailedScore.answer}`;
    }

    return score;
  }

  extractDetailedScore(rawResult: string): NumbleScoreInterface {
    const solved = extractData(getLine(rawResult, 2), /[❌✅]/);

    return {
      time: getLine(rawResult, 5),
      answer: +extractData(getLine(rawResult, 4), /[0-9.]+/),
      numbersUsed: +extractData(getLine(rawResult, 3), /[0-9]+/, 1),
      over: +extractData(getLine(rawResult, 3), /[0-9]+/, 2),
      result: solved === "✅" ? TurnResultEnum.WON : TurnResultEnum.LOST,
    };
  }
}
