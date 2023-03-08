import { ScoreInterface } from "../score.interface";

export interface SedecorderScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
