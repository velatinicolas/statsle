import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParserInterface } from "./turn-parser.interface";

@Injectable()
export class TusmoSeriesParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Tusmo série du jour";
  }

  handles(rawResult: string): boolean {
    return (
      rawResult
        .split("\n")[0]
        .match(/TUSMO \(@tusmo_xyz\) Suite de mots #[0-9]+/) !== null
    );
  }

  extractGameNumber(rawResult: string): number {
    const matches = rawResult.split("\n")[0].match(/[0-9]+/);

    if (matches) {
      return +matches[0];
    }

    throw new InternalServerErrorException(
      "Failed extracting Tusmo série du jour game number"
    );
  }

  extractScore(rawResult: string): string {
    const wordLines = rawResult
      .split("\n")
      .filter((line) => line.includes("lettres"));
    const wordsFound = wordLines.filter((wordLine) =>
      wordLine.includes("-")
    ).length;

    return `${wordsFound} / ${wordLines.length}`;
  }

  extractResult(rawResult: string): TurnResultEnum {
    const score = this.extractScore(rawResult);

    return score.split(" / ")[0] === score.split(" / ")[1]
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
