import { Injectable } from "@nestjs/common";
import { Game } from "src/challenge/entities/game.entity";
import { Turn } from "src/challenge/entities/turn.entity";
import { TurnsSorterInterface } from "../turns-sorter.interface";
import { SutomScoreInterface } from "./sutom-score.interface";

@Injectable()
export class SutomSorter implements TurnsSorterInterface<SutomScoreInterface> {
  handles(game: Game): boolean {
    return game.challenge.name === 'Sutom'
  }
  
  sort(turns: Turn<SutomScoreInterface>[]): Turn<SutomScoreInterface>[] {
    return turns.sort((a, b) => {
      if (a.detailedScore.attempts === b.detailedScore.attempts) {
        return 0
      }

      return a.detailedScore.attempts === b.detailedScore.attempts ? 1 : -1
    })
  }
}