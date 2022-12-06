import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RoleEnum } from "./role.enum";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  identifier: string;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text", nullable: true })
  email: string | null;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @Column({ type: "text" })
  role: string = RoleEnum.USER; // Hardcode role user to avoid unwanted admin

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
