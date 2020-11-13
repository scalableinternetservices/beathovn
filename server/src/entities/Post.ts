import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,

  ManyToOne, OneToMany,

  // eslint-disable-next-line prettier/prettier
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from './Comment'
import { Like } from './Like'
import { User } from './User'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Column()
  musicLink: string

  @Column()
  commentary: string

  @OneToMany(type => Comment, comment => comment.user)
  @JoinColumn()
  comments: Comment[]

  @OneToMany(type => Like, like => like.user)
  @JoinColumn()
  likes: Like[]

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
  // Asociated with User, many to one relationsihp
}
