import { ScoreInterface } from "../score.interface";

export interface EpisodeScoreInterface extends ScoreInterface {
  attempts: number;
  over: number;
}
