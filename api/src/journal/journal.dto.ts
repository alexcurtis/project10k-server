import { InputType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Schema } from 'mongoose';

export const defaultJournalData = {
    name: 'Untitled Journal',
    mindMapNode: {
        position: {
            x: 200,
            y: 200,
        },
        edges: [],
    },
    citations: [],
};

@InputType()
class MindMapNodeEdgeInput {
    @Field(() => String, { nullable: true })
    _id: string;

    @Field(() => ID)
    target: Schema.Types.ObjectId;
}

@InputType()
class MindMapNodePositionInput {
    @Field()
    x: number;

    @Field()
    y: number;
}

@InputType()
class MindMapNodeInput {
    @Field(() => ID, { nullable: true })
    _id: Schema.Types.ObjectId;

    @Field(() => MindMapNodePositionInput, { nullable: true })
    position: MindMapNodePositionInput;

    @Field(() => [MindMapNodeEdgeInput], { nullable: true })
    edges: MindMapNodeEdgeInput[];
}

@InputType()
export class InputCitation {
    @Field(() => ID, { nullable: true })
    _id: Schema.Types.ObjectId;

    @Field(() => String, { nullable: false })
    text: string;

    @Field(() => GraphQLJSONObject, { nullable: false })
    range: Object;

    @Field(() => ID, { nullable: false })
    company: Schema.Types.ObjectId;

    @Field(() => ID, { nullable: false })
    filing: Schema.Types.ObjectId;
}

@InputType()
export class InputJournalDto {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => MindMapNodeInput, { nullable: true })
    mindMapNode: MindMapNodeInput;
}
