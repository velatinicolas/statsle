import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  identifier: string

  @Column({ type: 'text', unique: true })
  username: string

  @Column({ type: 'text', nullable: true })
  email: string | null

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'boolean', default: false })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}