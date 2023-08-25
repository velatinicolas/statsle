import { DetailedScoreInterface } from "../detailed-score.interface";

export interface FramedScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
