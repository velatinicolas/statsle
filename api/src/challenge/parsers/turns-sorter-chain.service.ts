import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { TurnParserInterface } from "./turn-parser.interface";
import { TurnsSorterInterface } from "./turns-sorter.interface";

@Injectable()
export class TurnsSorterChain {
  constructor(
    @Inject("TURNS_SORTERS")
    private readonly turnsSorters: TurnsSorterInterface[]
  ) {}

  addTurnParser(turnParser: TurnParserInterface): void {
    this.turnParsers.push(turnParser);
  }

  findParserHandling(rawResult: string): TurnParserInterface {
    const validTurnParsers = this.turnParsers.filter((turnParser) =>
      turnParser.handles(rawResult)
    );

    if (validTurnParsers.length === 0) {
      throw new BadRequestException("Challenge not recognized!");
    } else if (validTurnParsers.length > 1) {
      throw new InternalServerErrorException(
        "More than one parser handle this result!"
      );
    }

    return validTurnParsers[0];
  }
}
