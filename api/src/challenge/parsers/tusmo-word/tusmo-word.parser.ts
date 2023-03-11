import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { TusmoWordScoreInterface } from "./tusmo-word-score.interface";

@Injectable()
export class TusmoWordParser
  implements TurnParserInterface<TusmoWordScoreInterface>
{
  getChallengeName(): string {
    return "Tusmo mot";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/TUSMO \(@tusmo_xyz\) #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `${detailedScore.attempts} / ${detailedScore.over}`;
    }

    return "";
  }

  extractDetailedScore(rawResult: string): TusmoWordScoreInterface {
    try {
      extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      return {
        attempts: 6, // TODO count real lines
        over: 6, // TODO count real lines
        result: TurnResultEnum.LOST,
      };
    }

    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      over: +extractData(getLine(rawResult, 1), /[0-9]+/, 3),
      result: TurnResultEnum.WON,
    };
  }
}
