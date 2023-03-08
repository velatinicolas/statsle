import { ScoreInterface } from "../score.interface";

export interface StateleScoreInterface extends ScoreInterface {
  attempts: number;
  attemptsOver: number;
  percentage: number;
  bonuses: number;
  bonusesOver: number;
}
