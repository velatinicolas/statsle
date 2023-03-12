import { ScoreInterface } from "../score.interface";

export interface TusmoWordScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
