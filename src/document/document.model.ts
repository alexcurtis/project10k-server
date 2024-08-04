// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    Document as MongooseDocument,
    Types,
    Schema as MongooseSchema,
} from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Document extends MongooseDocument {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop({
        type: String,
        enum: ['html', 'pdf'],
    })
    type: string;

    @Field()
    @Prop()
    name: string;

    @Field()
    @Prop()
    location: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
