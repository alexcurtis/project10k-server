// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import GraphQLJSON from 'graphql-type-json';
import { Journal } from '../journal.model';

@ObjectType()
@Schema({ timestamps: true })
export class JournalEntry extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field(() => GraphQLJSON)
    @Prop({ type: JSON })
    content: JSON;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Journal' })
    journal: Journal;
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);
