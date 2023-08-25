import { DetailedScoreInterface } from "../detailed-score.interface";

export interface DuotrigordleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  over: number;
  missed: number;
}
