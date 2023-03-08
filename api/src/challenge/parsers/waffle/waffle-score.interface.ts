import { ScoreInterface } from "../score.interface";

export interface WaffleScoreInterface extends ScoreInterface {
  stars: number;
  over: number;
}
