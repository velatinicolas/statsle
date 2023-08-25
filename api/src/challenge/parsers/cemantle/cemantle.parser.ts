import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { CemantleScoreInterface } from "./cemantle-score.interface";

@Injectable()
export class CemantleParser
  implements TurnParserInterface<CemantleScoreInterface>
{
  getChallengeName(): string {
    return "Cemantle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#cemantle/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractSummarizedScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    return `Attempts: ${detailedScore.attempts}`;
  }

  extractDetailedScore(rawResult: string): CemantleScoreInterface {
    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      result: TurnResultEnum.WON,
    };
  }
}
