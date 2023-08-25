import { DetailedScoreInterface } from "../detailed-score.interface";

export interface StateleScoreInterface extends DetailedScoreInterface {
  attempts: number;
  attemptsOver: number;
  percentage: number;
  bonuses: number;
  bonusesOver: number;
}
