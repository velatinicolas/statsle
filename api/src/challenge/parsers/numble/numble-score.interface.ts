import { ScoreInterface } from "../score.interface";

export interface NumbleScoreInterface extends ScoreInterface {
  time: string;
  tilesUsed: number;
  over: number;
  answer: number;
}
