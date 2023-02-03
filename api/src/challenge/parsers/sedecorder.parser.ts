import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../enums/turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class SedecorderParser extends TurnParser {
  getChallengeName(): string {
    return "Sedecorder";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/Sedec-order/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    try {
      return this.extractData(this.getLine(rawResult, 2), /[0-9]+\/[0-9]+/);
    } catch {
      let redSquares = 0;
      for (let lineNumber = 3; lineNumber <= 10; lineNumber++) {
        redSquares += this.countOccurrences(
          this.getLine(rawResult, lineNumber),
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
