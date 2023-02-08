import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class NumbleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Numble";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/^Numble [0-9]+$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const number = extractData(
      getLine(rawResult, 3),
      /[0-9]+\/[0-9]+/
    );
    const answer = extractData(getLine(rawResult, 4), /[0-9]+/);
    const time = getLine(rawResult, 5);

    return `${time}, ${number}, ${answer}`;
  }

  extractResult(rawResult: string): TurnResultEnum {
    const solved = extractData(getLine(rawResult, 2), /[❌✅]/);

    return solved === "✅" ? TurnResultEnum.WON : TurnResultEnum.LOST;
  }
}
