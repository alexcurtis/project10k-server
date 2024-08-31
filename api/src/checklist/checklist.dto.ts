import { InputType, Field, ID } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Schema } from "mongoose";

@InputType()
class CheckListScaleInput {
    @Field(() => Number)
    danger: number;

    @Field(() => Number)
    fail: number;

    @Field(() => Number)
    pass: number;

    @Field(() => Number)
    amazing: number;
}

@InputType()
export class InputCheckListDto {
    @Field(() => String)
    name: string;

    @Field(() => ID, { nullable: true })
    parent: Schema.Types.ObjectId;

    @Field(() => String)
    question: string;

    @Field(() => String, { nullable: true })
    formula: string;

    @Field(() => String, { nullable: true })
    why: string;

    @Field(() => Boolean)
    textual: boolean;

    @Field(() => String)
    metric: string;

    @Field(() => CheckListScaleInput, { nullable: true })
    scale: CheckListScaleInput;
}
