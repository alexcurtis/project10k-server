// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Journal } from '../journal.model';

@ObjectType()
@Schema({ timestamps: true })
export class JournalEntry extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field(() => GraphQLJSONObject)
    @Prop({ type: JSON })
    content: Object;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Journal' })
    journal: Journal;
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);
