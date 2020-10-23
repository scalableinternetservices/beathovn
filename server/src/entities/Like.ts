import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from 'Post';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post 

  @OneToOne(() => User)
  @JoinColumn()
  user: User
  // Associate with a post
}