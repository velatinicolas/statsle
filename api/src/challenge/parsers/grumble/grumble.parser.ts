import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, findLine, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class GrumbleParser implements TurnParserInterface {
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
    return extractData(
      findLine(rawResult, /^Score/),
      /[0-9]+ \/ [0-9]+/
    );
  }

  extractResult(rawResult: string): TurnResultEnum {
    const score = this.extractScore(rawResult);

    return score.split(" / ")[0] === score.split(" / ")[1]
      ? TurnResultEnum.WON
      : TurnResultEnum.ONGOING;
  }
}
