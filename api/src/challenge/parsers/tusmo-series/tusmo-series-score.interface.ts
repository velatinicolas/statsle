import { DetailedScoreInterface } from "../detailed-score.interface";

export interface TusmoSeriesScoreInterface extends DetailedScoreInterface {
  words: number;
  over: number;
  attempts: number;
}
