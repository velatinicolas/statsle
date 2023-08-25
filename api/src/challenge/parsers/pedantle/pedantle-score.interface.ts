import { DetailedScoreInterface } from "../detailed-score.interface";

export interface PedantleScoreInterface extends DetailedScoreInterface {
  attempts: number;
}
