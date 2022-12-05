import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TurnParserInterface } from "./turn-parser.interface";

@Injectable()
export class GrumbleParser implements TurnParserInterface {
  getChallengeName(): string {
    return 'Grumble';
  }

  handles(rawResult: string): boolean {
    return rawResult.split('\n')[0].match(/^@GrumbleFR #[0-9]+/) !== null
  }

  extractGameNumber(rawResult: string): number {
    const matches = rawResult.split('\n')[0].match(/[0-9]+/)

    if (matches) {
      return +(matches[0])
    }
    
    throw new InternalServerErrorException('Failed extracting Grumble game number')
  }
}