import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn , OneToMany} from 'typeorm'
import { User } from './User'
import { Comment } from './Comment'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Column()
  musicLink: String

  @Column()
  commentary: String

  @OneToMany(() => Comment)
  @JoinColumn()
  comments: Comment

  @OneToMany(() => Like)
  @JoinColumn()
  likes: Like

  @OneToOne(() => User)
  @JoinColumn()
  user: User
  // Asociated with User, many to one relationsihp
}
