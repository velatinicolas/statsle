import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { TurnParser } from "../turn-parser.interface";

@Injectable()
export class NerdleParser extends TurnParser {
  getChallengeName(): string {
    return "Nerdle";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/nerdlegame [0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    return this.extractData(this.getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
  }

  extractResult(rawResult: string): TurnResultEnum {
    return TurnResultEnum.WON;
  }
}
