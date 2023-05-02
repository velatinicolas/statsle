import { Game } from "../entities/game.entity";
import { Turn } from "../entities/turn.entity";
import { ScoreInterface } from "./score.interface";

export interface TurnsSorterInterface<T = ScoreInterface> {
  handles(game: Game): boolean;
  sort(turns: Turn<T>[]): Turn<T>[]
}