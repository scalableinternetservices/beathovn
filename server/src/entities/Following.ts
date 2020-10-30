import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from "./User"


@Entity()
export class Following extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Column()
  @OneToOne(() => User)
  @JoinColumn()
  follower: User

  @Column()
  @OneToOne(() => User)
  @JoinColumn()
  followee: User
}
