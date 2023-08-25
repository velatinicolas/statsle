import { DetailedScoreInterface } from "../detailed-score.interface";

export interface TusmoWordScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
