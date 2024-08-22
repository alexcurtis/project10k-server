// book.model.ts
import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Workspace } from '../workspace/workspace.model';
import { User } from 'src/user/user.model';

@ObjectType()
@Schema({ timestamps: true })
export class Account extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop()
    name: string;

    @Field(() => [User])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Field(() => [Workspace])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Workspace' }] })
    workspaces: Workspace[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
