import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, findLine, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";
import { GrumbleScoreInterface } from "./grumble-score.interface";

@Injectable()
export class GrumbleParser
  implements TurnParserInterface<GrumbleScoreInterface>
{
  getChallengeName(): string {
    return "Grumble";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/^@GrumbleFR #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const detailedScore = this.extractDetailedScore(rawResult);

    return `${detailedScore.score} / ${detailedScore.over}`;
  }

  extractDetailedScore(rawResult: string): GrumbleScoreInterface {
    const score = +extractData(findLine(rawResult, /^Score/), /[0-9]+/, 1);
    const over = +extractData(findLine(rawResult, /^Score/), /[0-9]+/, 2);

    return {
      score,
      over,
      result: score === over ? TurnResultEnum.WON : TurnResultEnum.ONGOING,
    };
  }
}
