import { ScoreInterface } from "../score.interface";

export interface SedecordleScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
