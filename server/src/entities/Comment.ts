import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from 'Post';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Column()
  text: String

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post 

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  // Associated with a post
}