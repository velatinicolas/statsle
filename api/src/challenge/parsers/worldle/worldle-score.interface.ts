import { DetailedScoreInterface } from "../detailed-score.interface";

export interface WorldleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  attemptsOver: number;
  percentage: number;
  bonuses: number;
  bonusesOver: number;
}
