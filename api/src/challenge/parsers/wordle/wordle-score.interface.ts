import { ScoreInterface } from "../score.interface";

export interface WordleScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
