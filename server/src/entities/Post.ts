import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,

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

  @Column({ default: '' })
  musicLinkImg: string

  @Column({ default: '' })
  musicLinkTitle: string

  @Column({ default: '' })
  musicLinkSite: string

  @Column()
  commentary: string

  @OneToMany(type => Comment, comment => comment.post)
  @JoinColumn()
  comments: Comment[]

  @OneToMany(type => Like, like => like.post)
  @JoinColumn()
  likes: Like[]

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn()
  user: User
  // Asociated with User, many to one relationsihp
}
