import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class TusmoWordParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Tusmo mot";
  }

  handles(rawResult: string): boolean {
    return (
      getLine(rawResult, 1).match(/TUSMO \(@tusmo_xyz\) #[0-9]+/) !== null
    );
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return extractData(getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
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
