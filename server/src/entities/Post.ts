import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';

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

  @OneToOne(() => User)
  @JoinColumn()
  user: User
  // Asociated with User, many to one relationsihp
}
