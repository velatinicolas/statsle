import { DetailedScoreInterface } from "../detailed-score.interface";

export interface EpisodeScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
}
