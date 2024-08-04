// book.model.ts
import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Company extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop()
    // CIK On Edgar
    externalId: string;

    @Field()
    @Prop()
    ticker: string;

    @Field()
    @Prop()
    title: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
