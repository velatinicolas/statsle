import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { NerdleScoreInterface } from "./nerdle-score.interface";

@Injectable()
export class NerdleParser implements TurnParserInterface<NerdleScoreInterface> {
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

  extractDetailedScore(rawResult: string): NerdleScoreInterface | null {
    try {
      return {
        attempts: +extractData(getLine(rawResult, 1), /[0-6]+/, 1),
        over: +extractData(getLine(rawResult, 1), /[0-6]+/, 2),
      };
    } catch {
      return null;
    }
  }

  extractResult(): TurnResultEnum {
    return TurnResultEnum.WON;
  }
}
