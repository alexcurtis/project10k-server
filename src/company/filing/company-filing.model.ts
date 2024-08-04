// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class CompanyFiling extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

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
}

export const CompanyFilingSchema = SchemaFactory.createForClass(CompanyFiling);
