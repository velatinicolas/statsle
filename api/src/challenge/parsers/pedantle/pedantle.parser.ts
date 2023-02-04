import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { TurnParser } from "../turn-parser.interface";

@Injectable()
export class PedantleParser extends TurnParser {
  getChallengeName(): string {
    return "Pedantle";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/#pedantle/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    return this.extractData(this.getLine(rawResult, 1), /[0-9]+/, 2);
  }

  extractResult(): TurnResultEnum {
    return TurnResultEnum.WON;
  }
}
