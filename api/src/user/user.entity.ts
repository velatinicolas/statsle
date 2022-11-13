import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  identifier: string

  @Column({ type: 'text' })
  pseudonym: string

  @Column({ type: 'text' })
  email: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'boolean', default: false })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}