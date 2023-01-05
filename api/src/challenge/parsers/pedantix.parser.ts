import { Injectable } from "@nestjs/common";
import { TurnResultEnum } from "../turn-result.enum";
import { TurnParser } from "./turn-parser.interface";

@Injectable()
export class PedantixParser extends TurnParser {
  getChallengeName(): string {
    return "Pédantix";
  }

  handles(rawResult: string): boolean {
    return this.getLine(rawResult, 1).match(/#pedantix/) !== null;
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
J'ai trouvé #pedantix nº237 en 9 coups !
🟩🟩🟩🟧🟧🟧🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
https://cemantix.certitudes.org/pedantix 
*/