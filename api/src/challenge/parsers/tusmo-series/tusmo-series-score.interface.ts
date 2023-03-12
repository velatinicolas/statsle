import { ScoreInterface } from "../score.interface";

export interface TusmoSeriesScoreInterface extends ScoreInterface {
  words: number;
  over: number;
  attempts: number;
}
