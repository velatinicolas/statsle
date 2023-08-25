import { Game } from "../entities/game.entity";
import { Turn } from "../entities/turn.entity";
import { DetailedScoreInterface } from "./detailed-score.interface";

export interface TurnsSorterInterface<T = DetailedScoreInterface> {
  handles(game: Game): boolean;
  sort(turns: Turn<T>[]): Turn<T>[]
}