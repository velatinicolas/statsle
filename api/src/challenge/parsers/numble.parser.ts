import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParserInterface } from "./turn-parser.interface";

@Injectable()
export class NumbleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Numble";
  }

  handles(rawResult: string): boolean {
    return rawResult.split("\n")[0].match(/^Numble [0-9]+$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    const matches = rawResult.split("\n")[0].match(/[0-9]+/);

    if (matches) {
      return +matches[0];
    }

    throw new InternalServerErrorException(
      "Failed extracting Numble game number"
    );
  }

  extractScore(rawResult: string): string {
    const lineNumbers = rawResult.split("\n")[2];
    const lineAnswer = rawResult.split("\n")[3];
    const lineTime = rawResult.split("\n")[4];

    if (!lineNumbers || !lineAnswer || !lineTime) {
      throw new BadRequestException(
        "Unable to extract score, input must be wrong!"
      );
    }

    const numbers = lineNumbers.match(/[0-9]+\/[0-9]+/);
    const answer = lineAnswer.match(/[0-9]+/);
    const time = lineTime;

    if (!numbers || !answer || !time) {
      throw new BadRequestException(
        "Unable to extract score, input must be wrong!"
      );
    }

    return `${time}, ${numbers[0]}, ${answer[0]}`;
  }

  extractResult(rawResult: string): TurnResultEnum {
    const lineSolved = rawResult.split("\n")[1];
    const solved = lineSolved.match(/[❌✅]/);

    if (!solved) {
      throw new BadRequestException(
        "Unable to extract result, input must be wrong!"
      );
    }

    return solved[0] === "✅" ? TurnResultEnum.WON : TurnResultEnum.LOST;
  }
}
