import { DetailedScoreInterface } from "../detailed-score.interface";

export interface WordleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
