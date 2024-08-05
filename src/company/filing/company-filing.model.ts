import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Company } from '../company.model';

@ObjectType()
@Schema({ timestamps: true })
export class CompanyFiling extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    // Reference Back To Company Parent
    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
    company: Company;

    @Field()
    @Prop()
    // Reference On Edgar
    externalId: string;

    @Field()
    // @Prop({
    //     type: String,
    //     enum: ['10K', '10Q'],
    // })
    @Prop()
    type: string;

    @Field()
    @Prop()
    name: string;

    @Field()
    @Prop()
    period: Date;

    @Field()
    @Prop()
    filedOn: Date;

    @Field()
    @Prop({
        type: String,
        enum: ['html', 'pdf'],
    })
    format: string;

    @Field()
    @Prop()
    location: string;
}

export const CompanyFilingSchema = SchemaFactory.createForClass(CompanyFiling);
