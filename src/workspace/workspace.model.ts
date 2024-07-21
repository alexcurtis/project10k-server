import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
// import { InvoiceModel } from '../invoice/invoice.model';

@ObjectType()
@Entity()
export class WorkspaceModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

//   @Field(type => [InvoiceModel], { nullable: true })
//   @OneToMany(type => InvoiceModel, invoice => invoice.customer)
//   invoices: InvoiceModel[]

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}