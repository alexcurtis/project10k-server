import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne,
    OneToOne,
    JoinTable,
    JoinColumn
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
import { AccountModel } from './../account/account.model';
import { CompanyModel } from './../company/company.model';
import { JournalModel } from './../journal/journal.model';

@ObjectType()
@Entity()
export class WorkspaceModel {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 500, nullable: false })
    name: string;

    // Account Workspace Belongs To
    @Field(type => AccountModel)
    @ManyToOne(type => AccountModel, account => account.workspaces)
    account: AccountModel;

    // Companies Referenced
    @Field(type => [CompanyModel], { nullable: true })
    @ManyToMany(type => CompanyModel)
    @JoinTable()
    companies: CompanyModel[]

    // Journal Referenced
    @Field(type => JournalModel)
    @OneToOne(() => JournalModel)
    @JoinColumn()
    journal: JournalModel

    @Field()
    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}