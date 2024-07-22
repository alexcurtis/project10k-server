import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CompanyModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;
}