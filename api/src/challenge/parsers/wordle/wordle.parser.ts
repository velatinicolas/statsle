import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { WordleScoreInterface } from "./wordle-score.interface";

@Injectable()
export class WordleParser implements TurnParserInterface<WordleScoreInterface> {
  getChallengeName(): string {
    return "Wordle";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/Wordle [0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return extractData(getLine(rawResult, 1), /[0-9]+\/[0-9]+/);
    } catch {
      return "";
    }
  }

  extractDetailedScore(rawResult: string): WordleScoreInterface {
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
