import { DetailedScoreInterface } from "../detailed-score.interface";

export interface NerdleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
