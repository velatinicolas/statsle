import { Injectable } from "@nestjs/common";
import { Game } from "src/challenge/entities/game.entity";
import { Turn } from "src/challenge/entities/turn.entity";
import { TurnsSorterInterface } from "../turns-sorter.interface";
import { CemantixScoreInterface } from "./cemantix-score.interface";

@Injectable()
export class CemantixSorter implements TurnsSorterInterface<CemantixScoreInterface> {
  handles(game: Game): boolean {
    return game.challenge.name === 'cemantix'
  }
  
  sort(turns: Turn<CemantixScoreInterface>[]): Turn<CemantixScoreInterface>[] {
    return turns.sort((a, b) => {
      if (a.detailedScore.attempts === b.detailedScore.attempts) {
        return 0
      }

      return a.detailedScore.attempts === b.detailedScore.attempts ? 1 : -1
    })
  }
}