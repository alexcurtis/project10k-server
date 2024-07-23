import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class JournalModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  content: string;
}