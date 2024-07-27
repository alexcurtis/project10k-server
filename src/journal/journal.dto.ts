import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema } from 'mongoose';

export const defaultJournalData = {
    name: 'Untitled Journal',
    mindMapNode: {
        position: {
            x: 200,
            y: 200
        },
        edges: []
    }
}

@InputType()
class MindMapNodeEdgeInput {
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
    @Field(() => MindMapNodePositionInput, { nullable: true })
    position: MindMapNodePositionInput;

    @Field(() => [MindMapNodeEdgeInput], { nullable: true })
    edges: MindMapNodeEdgeInput[];
}

@InputType()
export class InputJournalDto {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => MindMapNodeInput, { nullable: true })
    mindMapNode: MindMapNodeInput;
}