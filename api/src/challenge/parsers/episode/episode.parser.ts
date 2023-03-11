import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { EpisodeScoreInterface } from "./episode-score.interface";

@Injectable()
export class EpisodeParser
  implements TurnParserInterface<EpisodeScoreInterface>
{
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
    const detailedScore = this.extractDetailedScore(rawResult);

    if (detailedScore.result === TurnResultEnum.WON) {
      return `${detailedScore.attempts} / ${detailedScore.over}`;
    }

    return "";
  }

  extractDetailedScore(rawResult: string): EpisodeScoreInterface {
    const lineScore = getLine(rawResult, 2);
    const redSquaresCount = countOccurrences(lineScore, "🟥");
    const greenSquaresCount = countOccurrences(lineScore, "🟩");
    const blackSquaresCount = countOccurrences(lineScore, "⬛");

    if (greenSquaresCount === 0) {
      return {
        attempts: redSquaresCount + blackSquaresCount,
        over: redSquaresCount + blackSquaresCount,
        result: TurnResultEnum.LOST,
      };
    }

    return {
      attempts: redSquaresCount + 1,
      over: redSquaresCount + greenSquaresCount + blackSquaresCount,
      result: TurnResultEnum.WON,
    };
  }
}
