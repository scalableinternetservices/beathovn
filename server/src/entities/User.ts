import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  // eslint-disable-next-line prettier/prettier
  UpdateDateColumn
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Comment } from './Comment'
import { Following } from './Following'
import { Like } from './Like'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @OneToMany(type => Like, like => like.user)
  likes: Like[]

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[]

  @OneToMany(type => Following, following => following.followee)
  followers: Following[]

  @OneToMany(type => Following, following => following.follower)
  following: Following[]
}
