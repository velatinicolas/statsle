import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TurnResultEnum } from "../enums/turn-result.enum";
import { Game } from "./game.entity";

@Entity("turns")
export class Turn {
  @PrimaryGeneratedColumn("uuid")
  identifier: string;

  @ManyToOne(() => Game)
  game: Game;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "text" })
  result: TurnResultEnum;

  @Column({ type: "text" })
  score: string;

  @Column({ type: "integer", nullable: true })
  combo: number;

  @Column({ type: "text" })
  rawResult: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
