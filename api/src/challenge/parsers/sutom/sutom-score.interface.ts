import { ScoreInterface } from "../score.interface";

export interface SutomScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
