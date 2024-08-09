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
    @Prop({
        type: String,
        unique: true,
        index: true,
        required: true,
    })
    // Reference On Edgar
    apidbId: string;

    @Field()
    @Prop()
    form: string;

    @Field()
    @Prop()
    name: string;

    @Field({ nullable: true })
    @Prop()
    period: Date;

    @Field()
    @Prop()
    filedOn: Date;

    @Field()
    @Prop({
        type: String,
        enum: ['HTML', 'XML', 'PDF', 'UNKNOWN'],
    })
    format: string;

    @Field()
    @Prop()
    path: string;

    @Field()
    @Prop()
    filename: string;
}

export const CompanyFilingSchema = SchemaFactory.createForClass(CompanyFiling);
