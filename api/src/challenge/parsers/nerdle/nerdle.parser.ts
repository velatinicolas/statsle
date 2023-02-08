import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class NerdleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Nerdle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/nerdlegame [0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    return extractData(getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
  }

  extractResult(): TurnResultEnum {
    return TurnResultEnum.WON;
  }
}
