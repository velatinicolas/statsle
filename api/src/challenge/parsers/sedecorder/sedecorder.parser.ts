import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class SedecorderParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Sedecorder";
  }

  handles(rawResult: string): boolean {
    return getLine(rawResult, 1).match(/Sedec-order/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return extractData(getLine(rawResult, 2), /[0-9]+\/[0-9]+/);
    } catch {
      let redSquares = 0;
      for (let lineNumber = 3; lineNumber <= 10; lineNumber++) {
        redSquares += countOccurrences(
          getLine(rawResult, lineNumber),
          "🟥"
        );
      }
      return `${redSquares / 2} missed`;
    }
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult).includes("missed")
      ? TurnResultEnum.LOST
      : TurnResultEnum.WON;
  }
}
