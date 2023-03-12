import { ScoreInterface } from "../score.interface";

export interface WorldleScoreInterface extends ScoreInterface {
  attempts: number;
  attemptsOver: number;
  percentage: number;
  bonuses: number;
  bonusesOver: number;
}
