import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "challenges" })
export class Challenge {
  @PrimaryGeneratedColumn("increment")
  identifier: number;

  @Column({ type: "text", unique: true })
  name: string;

  @Column({ type: "text" })
  url: string;

  @Column({ type: "boolean", default: false })
  replayable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
