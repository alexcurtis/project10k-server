// book.model.ts
import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { CompanyFiling } from './filing/company-filing.model';

@ObjectType()
@Schema({ timestamps: true })
export class Company extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop({
        type: String,
        unique: true,
        index: true,
        required: true,
    })
    // Reference On Edgar
    apidbId: string;

    @Field(() => [String])
    @Prop({ type: [{ type: String }] })
    ticker: string[];

    @Field()
    @Prop()
    title: string;

    @Field()
    @Prop({
        type: String,
        enum: ['ussec'],
    })
    database: string;

    @Field(() => [CompanyFiling])
    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CompanyFiling' }],
    })
    filings: CompanyFiling[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
// Text Search Index
CompanySchema.index({ title: 'text' });
