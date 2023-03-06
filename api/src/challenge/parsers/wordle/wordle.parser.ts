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
      return extractData(getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
    } catch {
      return "";
    }
  }

  extractDetailedScore(rawResult: string): WordleScoreInterface | null {
    try {
      extractData(getLine(rawResult, 1), /[0-6]+\/[0-6]+/);
    } catch {
      return null;
    }

    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-6]+/, 2),
      over: +extractData(getLine(rawResult, 1), /[0-6]+/, 3),
    };
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult)
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
