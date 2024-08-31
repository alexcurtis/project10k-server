// book.model.ts
import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { Account } from "src/account/account.model";

@ObjectType()
@Schema()
export class CheckListScale {
    @Field()
    @Prop()
    danger: number;

    @Field()
    @Prop()
    fail: number;

    @Field()
    @Prop()
    pass: number;

    @Field()
    @Prop()
    amazing: number;
}

const CheckListScaleSchema = SchemaFactory.createForClass(CheckListScale);

@ObjectType()
@Schema({ timestamps: true })
export class CheckList extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field(() => Account)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Account" })
    account: Account;

    @Field(() => String, { nullable: true })
    @Prop()
    name: string;

    @Field(() => ID, { nullable: true })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "CheckList" })
    parent: CheckList;

    @Field(() => [CheckList], { nullable: true })
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "CheckList" }] })
    children: CheckList[];

    @Field(() => String, { nullable: true })
    @Prop()
    question: string;

    @Field(() => String, { nullable: true })
    @Prop()
    formula: string;

    @Field(() => String, { nullable: true })
    @Prop()
    why: string;

    @Field(() => Boolean, { nullable: true })
    @Prop()
    textual: boolean;

    @Field(() => String, { nullable: true })
    @Prop({
        type: String,
        enum: ["PASS_FAIL", "SCALE", "NONE"],
    })
    metric: string;

    @Field(() => CheckListScale, { nullable: true })
    @Prop({ type: CheckListScaleSchema })
    scale: CheckListScale;
}

export const CheckListSchema = SchemaFactory.createForClass(CheckList);
