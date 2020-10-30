import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @ManyToOne(type => Post, post => post.likes)
  @JoinColumn()
  post: Post

  @ManyToOne(type => User, user => user.likes)
  @JoinColumn()
  user: User
  // Associate with a post
}
