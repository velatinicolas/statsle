import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class EpisodeParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Episode";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/^Episode #[0-9]+$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const lineScore = getLine(rawResult, 2);
    const redSquaresCount = countOccurrences(lineScore, "🟥");
    const greenSquaresCount = countOccurrences(lineScore, "🟩");
    const blackSquaresCount = countOccurrences(lineScore, "⬛");

    if (greenSquaresCount === 0) {
      return "";
    }

    return `${redSquaresCount + 1} / ${
      redSquaresCount + greenSquaresCount + blackSquaresCount
    }`;
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult)
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
