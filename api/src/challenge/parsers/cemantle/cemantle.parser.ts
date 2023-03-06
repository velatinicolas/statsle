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

  extractScore(rawResult: string): string {
    return extractData(getLine(rawResult, 1), /[0-9]+/, 2);
  }

  extractDetailedScore(rawResult: string): CemantleScoreInterface | null {
    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
    };
  }

  extractResult(rawResult: string): TurnResultEnum {
    return TurnResultEnum.WON;
  }
}
