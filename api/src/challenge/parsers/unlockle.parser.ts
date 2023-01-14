import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class UnlockleParser extends TurnParser {
  getChallengeName(): string {
    return "Unlockle";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/Unlockle [0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return this.extractData(this.getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
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
