import { ScoreInterface } from "../score.interface";

export interface UnlockleScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
