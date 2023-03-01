import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { TurnParser } from "../turn-parser.interface";

@Injectable()
export class GrumbleParser extends TurnParser {
  getChallengeName(): string {
    return "Grumble";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/^@GrumbleFR #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    return this.extractData(
      this.findLine(rawResult, /^Score/),
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
