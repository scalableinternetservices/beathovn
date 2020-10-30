import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Column()
  text: string

  @ManyToOne(type => Post, post => post.comments)
  @JoinColumn()
  post: Post

  @ManyToOne(type => User, user => user.comments)
  @JoinColumn()
  user: User

  // Associated with a post
}
