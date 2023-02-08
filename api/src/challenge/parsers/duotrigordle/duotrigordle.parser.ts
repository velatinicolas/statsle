import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class DuotrigordleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Duotrigordle";
  }

  handles(rawResult: string): boolean {
    return (
      getLine(rawResult, 1).match(/Daily Duotrigordle #[0-9]+/) !== null
    );
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return extractData(getLine(rawResult, 2), /[0-9]+\/[0-9]+/);
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
