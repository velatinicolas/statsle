import { DetailedScoreInterface } from "../detailed-score.interface";

export interface UnlockleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
