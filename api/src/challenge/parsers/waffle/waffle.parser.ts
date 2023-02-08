import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class WaffleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Waffle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#waffle[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return extractData(getLine(rawResult, 1), /[0-5]+\/[0-5]+/);
    } catch {
      return "";
    }
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult)
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
