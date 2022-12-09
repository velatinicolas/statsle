import { User } from "../user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Game } from "./game.entity";
import { TurnResultEnum } from "./turn-result.enum";

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

  @Column({ type: "text" })
  rawResult: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
