import { DetailedScoreInterface } from "../detailed-score.interface";

export interface GrumbleScoreInterface extends DetailedScoreInterface {
  score: number;
  over: number;
}
