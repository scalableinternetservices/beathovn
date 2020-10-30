import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Following extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @ManyToOne(type => User, user => user.following)
  @JoinColumn()
  follower: User

  @ManyToOne(type => User, user => user.followers)
  @JoinColumn()
  followee: User
}
