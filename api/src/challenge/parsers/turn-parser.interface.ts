import { TurnResultEnum } from "../turn-result.enum";

export interface TurnParserInterface {
  getChallengeName(): string;
  handles(rawResult: string): boolean;
  extractGameNumber(rawResult: string): number;
  extractResult(rawResult: string): TurnResultEnum;
  extractScore(rawResult: string): string;
}

export abstract class TurnParser implements TurnParserInterface {
  abstract getChallengeName(): string;
  abstract handles(rawResult: string): boolean;
  abstract extractGameNumber(rawResult: string): number;
  abstract extractResult(rawResult: string): TurnResultEnum;
  abstract extractScore(rawResult: string): string;

  protected getLine(rawResult: string, lineNumber: number): string {
    return rawResult.split("\n")[lineNumber - 1];
  }

  protected findLine(rawResult: string, regex: RegExp): string {
    const foundLine = rawResult.split("\n").find((line) => line.match(regex));

    if (!foundLine) {
      throw new Error(
        `Line matching regex ${regex} not found in "${rawResult}"`
      );
    }

    return foundLine;
  }

  protected findLines(rawResult: string, regex: RegExp): string[] {
    return rawResult.split("\n").filter((line) => line.match(regex));
  }

  protected extractData(source: string, regex: RegExp): string {
    const match = source.match(regex);

    if (!match) {
      throw new Error(`No match with regex ${regex} found in "${source}"`);
    }

    return match[0];
  }

  protected countOccurrences(source: string, data: string): number {
    return source.split(data).length - 1;
  }
}
