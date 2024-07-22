import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
import { WorkspaceModel } from '../workspace/workspace.model';

@ObjectType()
@Entity()
export class AccountModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field(type => [WorkspaceModel], { nullable: true })
  @OneToMany(type => WorkspaceModel, workspace => workspace.account)
  workspaces: WorkspaceModel[]

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}