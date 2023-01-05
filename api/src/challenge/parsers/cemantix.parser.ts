import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class CemantixParser extends TurnParser {
  getChallengeName(): string {
    return "Cémantix";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/#cemantix/) !== null;
  }

  extractGameNumber(rawResult: string): number {
    return +this.extractData(this.getLine(rawResult, 1), /[0-9]+/);
  }

  extractScore(rawResult: string): string {
    return this.extractData(this.getLine(rawResult, 1), /[0-9]+/, 2);
  }

  extractResult(rawResult: string): TurnResultEnum {
    return TurnResultEnum.WON;
  }
}

/*
J'ai trouvé #cemantix nº309 en 101 coups !
🥳
😱
🔥6️⃣
🥵1️⃣1️⃣
😎😎😎3️⃣1️⃣
🥶🥶🥶🥶4️⃣6️⃣
🧊5️⃣
https://cemantix.certitudes.org/ 
*/