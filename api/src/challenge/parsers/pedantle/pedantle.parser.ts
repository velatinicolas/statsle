import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { PedantleScoreInterface } from "./pedantle-score.interface";

@Injectable()
export class PedantleParser
  implements TurnParserInterface<PedantleScoreInterface>
{
  getChallengeName(): string {
    return "Pedantle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#pedantle/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractSummarizedScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    return `Attempts: ${detailedScore.attempts}`;
  }

  extractDetailedScore(rawResult: string): PedantleScoreInterface {
    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      result: TurnResultEnum.WON,
    };
  }
}
