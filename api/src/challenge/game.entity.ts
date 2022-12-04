import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Challenge } from "./challenge.entity"

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('increment')
  identifier: number

  @ManyToOne(() => Challenge)
  challenge: Challenge

  @Column({ type: 'integer'})
  number: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}