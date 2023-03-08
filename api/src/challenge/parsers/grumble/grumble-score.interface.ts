import { ScoreInterface } from "../score.interface";

export interface GrumbleScoreInterface extends ScoreInterface {
  score: number;
  over: number;
}
