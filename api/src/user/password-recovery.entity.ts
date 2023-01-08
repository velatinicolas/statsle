import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "password_recoveries" })
export class PasswordRecovery {
  @PrimaryGeneratedColumn("uuid")
  identifier: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: "text" })
  token: string;

  // The token is stored hashed, so an attacker with DB access
  // would not be able to store token and call the recover password endpoint.
  unhashedToken: string;

  @Column({ type: "timestamp without time zone" })
  expiresAt: Date;

  @Column({ type: "timestamp without time zone", nullable: true })
  usedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
