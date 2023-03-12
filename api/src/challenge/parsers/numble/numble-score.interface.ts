import { ScoreInterface } from "../score.interface";

export interface NumbleScoreInterface extends ScoreInterface {
  time: string;
  numbersUsed: number;
  over: number;
  answer: number;
}
