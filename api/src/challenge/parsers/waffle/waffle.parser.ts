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
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `${detailedScore.stars} / ${detailedScore.over}`;
    }

    return "";
  }

  extractDetailedScore(rawResult: string): WaffleScoreInterface {
    try {
      extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      return {
        stars: 0,
        over: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
        result: TurnResultEnum.LOST,
      };
    }

    return {
      stars: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      over: +extractData(getLine(rawResult, 1), /[0-9]+/, 3),
      result: TurnResultEnum.WON,
    };
  }
}
