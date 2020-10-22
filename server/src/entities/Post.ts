import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'User';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // Asociated with User, many to one relationsihp

}