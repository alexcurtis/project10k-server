// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Workspace } from '../workspace/workspace.model';

@Schema()
class MindMapNodeEdge {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    target: MongooseSchema.Types.ObjectId
}

const MindMapNodeEdgeSchema = SchemaFactory.createForClass(MindMapNodeEdge);

@Schema()
class MindMapNodePosition {
    @Prop()
    x: number;

    @Prop()
    y: number;
}

const MindMapNodePositionSchema = SchemaFactory.createForClass(MindMapNodePosition);

// @ObjectType()
@Schema()
class MindMapNode {
    @Prop({ type: MindMapNodePositionSchema })
    position: MindMapNodePosition;

    @Prop({ type: [MindMapNodeEdgeSchema] })
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

    // @Field()
    @Prop({ type: MindMapNodeSchema, required: true })
    mindMapNode: MindMapNode;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
