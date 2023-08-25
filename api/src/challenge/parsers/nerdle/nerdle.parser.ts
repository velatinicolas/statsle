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

  extractSummarizedScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    return `Attempts: ${detailedScore.attempts} / ${detailedScore.over}`;
  }

  extractDetailedScore(rawResult: string): NerdleScoreInterface {
    return {
      attempts: +extractData(getLine(rawResult, 1), /[0-9]+/, 2),
      over: +extractData(getLine(rawResult, 1), /[0-9]+/, 3),
      result: TurnResultEnum.WON,
    };
  }
}
