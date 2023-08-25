import { DetailedScoreInterface } from "../detailed-score.interface";

export interface QuordleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
