import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from 'Post';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // Associated with a post
}