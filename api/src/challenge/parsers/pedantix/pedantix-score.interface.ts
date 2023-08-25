import { DetailedScoreInterface } from "../detailed-score.interface";

export interface PedantixScoreInterface extends DetailedScoreInterface {
  attempts: number;
}
