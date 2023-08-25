import { DetailedScoreInterface } from "../detailed-score.interface";

export interface NumbleScoreInterface extends DetailedScoreInterface {
  time: string;
  numbersUsed: number;
  over: number;
  answer: number;
}
