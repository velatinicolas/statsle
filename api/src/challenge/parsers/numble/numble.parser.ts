import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../../enums/turn-result.enum";
import { TurnParser } from "../turn-parser.interface";

@Injectable()
export class NumbleParser extends TurnParser {
  getChallengeName(): string {
    return "Numble";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/^Numble [0-9]+$/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    const number = this.extractData(
      this.getLine(rawResult, 3),
      /[0-9]+\/[0-9]+/
    );
    const answer = this.extractData(this.getLine(rawResult, 4), /[0-9]+/);
    const time = this.getLine(rawResult, 5);

    return `${time}, ${number}, ${answer}`;
  }

  extractResult(rawResult: string): TurnResultEnum {
    const solved = this.extractData(this.getLine(rawResult, 2), /[❌✅]/);

    return solved === "✅" ? TurnResultEnum.WON : TurnResultEnum.LOST;
  }
}
