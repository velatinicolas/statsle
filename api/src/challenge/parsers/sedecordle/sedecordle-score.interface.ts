import { DetailedScoreInterface } from "../detailed-score.interface";

export interface SedecordleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
