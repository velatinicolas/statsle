import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Game } from "../entities/game.entity";
import { TurnsSorterInterface } from "./turns-sorter.interface";

@Injectable()
export class TurnsSorterChain {
  constructor(
    @Inject("TURNS_SORTERS")
    private readonly turnsSorters: TurnsSorterInterface[]
  ) {}

  addTurnSorter(turnsSorter: TurnsSorterInterface): void {
    this.turnsSorters.push(turnsSorter);
  }

  findSorterHandling(game: Game): TurnsSorterInterface {
    const validTurnsSorters = this.turnsSorters.filter((turnsSorter) =>
      turnsSorter.handles(game)
    );

    if (validTurnsSorters.length === 0) {
      throw new BadRequestException("Challenge not recognized!");
    } else if (validTurnsSorters.length > 1) {
      throw new InternalServerErrorException(
        "More than one sorter handle this result!"
      );
    }

    return validTurnsSorters[0];
  }
}
