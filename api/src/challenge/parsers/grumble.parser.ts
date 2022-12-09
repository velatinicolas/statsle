import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParserInterface } from "./turn-parser.interface";

@Injectable()
export class GrumbleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Grumble";
  }

  handles(rawResult: string): boolean {
    return rawResult.split("\n")[0].match(/^@GrumbleFR #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    const matches = rawResult.split("\n")[0].match(/[0-9]+/);

    if (matches) {
      return +matches[0];
    }

    throw new InternalServerErrorException(
      "Failed extracting Grumble game number"
    );
  }

  extractScore(rawResult: string): string {
    const lineScore = rawResult
      .split("\n")
      .find((line) => line.match(/^Score/));

    if (!lineScore) {
      throw new BadRequestException(
        "Unable to extract score, input must be wrong!"
      );
    }

    const score = lineScore.match(/[0-9]+ \/ [0-9]+/);

    if (!score) {
      throw new BadRequestException(
        "Unable to extract score, input must be wrong!"
      );
    }

    return score[0];
  }

  extractResult(rawResult: string): TurnResultEnum {
    const score = this.extractScore(rawResult);

    return score.split(" / ")[0] === score.split(" / ")[1]
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
