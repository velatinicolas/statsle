import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { countOccurrences, extractData, getLine } from "../raw-result.helper";
import { TurnParserInterface } from "../turn-parser.interface";

@Injectable()
export class SedecordleParser implements TurnParserInterface {
  getChallengeName(): string {
    return "Sedecordle";
  }

  handles(rawResult: string): boolean {
    if (!getLine(rawResult, 11)) {
      return false;
    }

    return getLine(rawResult, 11).match(/^#sedecordle$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +extractData(getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    let redSquares = 0;
    for (let lineNumber = 2; lineNumber <= 9; lineNumber++) {
      redSquares += countOccurrences(
        getLine(rawResult, lineNumber),
        "🟥"
      );
    }

    if (redSquares > 0) {
      return `${redSquares / 2} missed`;
    }

    const scores = [
      ["21", /2️⃣1️⃣/],
      ["20", /2️⃣0️⃣/],
      ["19", /1️⃣9️⃣/],
      ["18", /1️⃣8️⃣/],
      ["17", /1️⃣7️⃣/],
      ["16", /1️⃣6️⃣/],
    ];

    for (const [score, regex] of scores) {
      for (let lineNumber = 2; lineNumber <= 9; lineNumber++) {
        if (getLine(rawResult, lineNumber).match(regex)) {
          return `${score} / 21`;
        }
      }
    }

    throw new Error("Unable to extract score");
  }

  extractResult(rawResult: string): TurnResultEnum {
    return this.extractScore(rawResult).includes("missed")
      ? TurnResultEnum.LOST
      : TurnResultEnum.WON;
  }
}
