import { ScoreInterface } from "../score.interface";

export interface DuotrigordleScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
