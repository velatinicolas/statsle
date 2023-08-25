import { DetailedScoreInterface } from "../detailed-score.interface";

export interface WaffleScoreInterface extends DetailedScoreInterface {
  stars: number;
  over: number;
}
