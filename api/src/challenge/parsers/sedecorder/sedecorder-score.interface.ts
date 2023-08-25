import { DetailedScoreInterface } from "../detailed-score.interface";

export interface SedecorderScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
