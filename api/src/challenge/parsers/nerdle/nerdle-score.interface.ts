import { ScoreInterface } from "../score.interface";

export interface NerdleScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
