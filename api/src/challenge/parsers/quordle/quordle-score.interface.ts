import { ScoreInterface } from "../score.interface";

export interface QuordleScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
