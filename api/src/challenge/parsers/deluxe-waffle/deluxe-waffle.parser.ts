import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { DeluxeWaffleScoreInterface } from "./deluxe-waffle-score.interface";

@Injectable()
export class DeluxeWaffleParser
  implements TurnParserInterface<DeluxeWaffleScoreInterface>
{
  getChallengeName(): string {
    return "Deluxe Waffle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#deluxewaffle[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `Stars: ${detailedScore.stars} / ${detailedScore.over}`;
    }

    return "";
  }

  extractDetailedScore(rawResult: string): DeluxeWaffleScoreInterface {
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
