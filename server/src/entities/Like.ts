import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from 'Post';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // Associate with a post

}