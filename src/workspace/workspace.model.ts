// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Account } from '../account/account.model';
import { Journal } from '../journal/journal.model';

@ObjectType()
@Schema({ timestamps: true })
export class Workspace extends Document {
    @Field(() => ID,{ nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop({ defaultValue: 'Untitled Workspace'})
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
    account: Account;

    @Field(() => Date)
    updatedAt: Date

    @Field(() => [Journal])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Journal' }] })
    journals: Journal[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
