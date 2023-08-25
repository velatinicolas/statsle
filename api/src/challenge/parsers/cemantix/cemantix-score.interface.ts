import { DetailedScoreInterface } from "../detailed-score.interface";

export interface CemantixScoreInterface extends DetailedScoreInterface {
  attempts: number;
}
