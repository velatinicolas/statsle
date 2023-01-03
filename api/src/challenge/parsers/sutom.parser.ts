import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParserInterface } from "./turn-parser.interface";

@Injectable()
export class SutomParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Sutom";
  }

  handles(rawResult: string): boolean {
    return rawResult.split("\n")[0].match(/#SUTOM #[0-9]+/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    const matches = rawResult.split("\n")[0].match(/[0-9]+/);

    if (matches) {
      return +matches[0];
    }

    throw new InternalServerErrorException(
      "Failed extracting Sutom game number"
    );
  }

  extractScore(rawResult: string): string {
    const score = rawResult.split("\n")[0].match(/[0-6]+\/[0-6]+/);

    return score ? score[0] : "";
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult)
      ? TurnResultEnum.WON
      : TurnResultEnum.LOST;
  }
}
