import { ScoreInterface } from "../score.interface";

export interface FramedScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
