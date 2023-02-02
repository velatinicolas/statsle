import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class DuotrigordleParser extends TurnParser {
  getChallengeName(): string {
    return "Duotrigordle";
  }

  handles(rawResult: string): boolean {
    return (
      this.getLine(rawResult, 1).match(/Daily Duotrigordle #[0-9]+/) !== null
    );
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return this.extractData(this.getLine(rawResult, 2), /[0-9]+\/[0-9]+/);
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
