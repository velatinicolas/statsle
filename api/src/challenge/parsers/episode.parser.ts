import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class EpisodeParser extends TurnParser {
  getChallengeName(): string {
    return "Episode";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/^Episode #[0-9]+$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const lineScore = this.getLine(rawResult, 2);
    const redSquaresCount = this.countOccurrences(lineScore, "🟥");
    const greenSquaresCount = this.countOccurrences(lineScore, "🟩");
    const blackSquaresCount = this.countOccurrences(lineScore, "⬛");

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
