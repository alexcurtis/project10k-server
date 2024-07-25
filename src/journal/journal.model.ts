// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Workspace } from '../workspace/workspace.model';

@ObjectType()
@Schema()
class MindMapNodeEdge {
    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId})
    target: MongooseSchema.Types.ObjectId;
}

const MindMapNodeEdgeSchema = SchemaFactory.createForClass(MindMapNodeEdge);

@ObjectType()
@Schema()
class MindMapNodePosition {
    @Field()
    @Prop()
    x: number;

    @Field()
    @Prop()
    y: number;
}

const MindMapNodePositionSchema = SchemaFactory.createForClass(MindMapNodePosition);

@ObjectType()
@Schema()
class MindMapNode {
    @Field(() => MindMapNodePosition)
    @Prop({ type: MindMapNodePositionSchema })
    position: MindMapNodePosition;

    @Field(() => [MindMapNodeEdge])
    @Prop({ type: [{ type: MindMapNodeEdgeSchema }] })
    edges: MindMapNodeEdge[];
}

const MindMapNodeSchema = SchemaFactory.createForClass(MindMapNode);

@ObjectType()
@Schema({ timestamps: true })
export class Journal extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop({ defaultValue: 'Untitled Journal' })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Workspace' })
    workspace: Workspace;

    @Field(() => MindMapNode)
    @Prop({ type: MindMapNodeSchema, required: true })
    mindMapNode: MindMapNode;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
