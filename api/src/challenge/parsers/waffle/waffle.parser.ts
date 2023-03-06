import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { WaffleScoreInterface } from "./waffle-score.interface";

@Injectable()
export class WaffleParser implements TurnParserInterface<WaffleScoreInterface> {
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

  extractDetailedScore(rawResult: string): WaffleScoreInterface | null {
    try {
      extractData(getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
    } catch {
      return null;
    }

    return {
      stars: +extractData(getLine(rawResult, 1), /[0-6]+/, 2),
      over: +extractData(getLine(rawResult, 1), /[0-6]+/, 3),
    };
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult)
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
