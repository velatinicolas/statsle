import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('increment')
  identifier: number

  @Column({ type: 'text', unique: true })
  name: string

  @Column({ type: 'text' })
  url: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}