import { DetailedScoreInterface } from "../detailed-score.interface";

export interface SutomScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
