// book.model.ts
import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Account } from 'src/account/account.model';

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field(() => Account)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
    account: Account;

    @Field()
    @Prop()
    firstName: string;

    @Field()
    @Prop()
    lastName: string;

    @Field()
    @Prop()
    email: string;

    // This Should Not Be A GraphQL Field
    @HideField()
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
