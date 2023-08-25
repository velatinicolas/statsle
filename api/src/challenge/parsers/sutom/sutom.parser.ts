import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { SutomScoreInterface } from "./sutom-score.interface";

@Injectable()
export class SutomParser implements TurnParserInterface<SutomScoreInterface> {
  getChallengeName(): string {
    return "Sutom";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/#SUTOM #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractSummarizedScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `Attempts: ${detailedScore.attempts} / ${detailedScore.over}`;
    }

    return "";
  }

  extractDetailedScore(rawResult: string): SutomScoreInterface {
    try {
      extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      return {
        attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
        over: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
        result: TurnResultEnum.LOST,
      };
    }

    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      over: +extractData(getLine(rawResult, 1), /[0-9]+/, 3),
      result: TurnResultEnum.WON,
    };
  }
}
