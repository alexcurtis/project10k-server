// book.model.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Workspace, WorkspaceSchema } from '../workspace/workspace.model';
import { JournalEntry } from './entry/journal-entry.model';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Company } from 'src/company/company.model';
import { CompanyFiling } from 'src/company/filing/company-filing.model';

@ObjectType()
@Schema()
class MindMapNodeEdge {
    @Field(() => String, { nullable: false })
    @Prop({ type: String })
    _id: string;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId })
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
export class MindMapNode {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

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
export class Citation {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop()
    text: string;

    @Field(() => GraphQLJSONObject)
    @Prop({ type: JSON })
    range: Object;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
    company: Company;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CompanyFiling' })
    filing: CompanyFiling;

    @Field(() => Date)
    updatedAt: Date;

    @Field()
    @Prop()
    embeddedOnJournalEntry: boolean;
}

const CitationSchema = SchemaFactory.createForClass(Citation);

@ObjectType()
@Schema({ timestamps: true })
export class Journal extends Document {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field()
    @Prop({ defaultValue: 'Untitled Journal' })
    name: string;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Workspace' })
    workspace: Workspace;

    @Field(() => ID)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'JournalEntry' })
    journalEntry: JournalEntry;

    @Field(() => MindMapNode)
    @Prop({ type: MindMapNodeSchema, required: true })
    mindMapNode: MindMapNode;

    @Field(() => [Citation])
    @Prop({ type: [CitationSchema] })
    citations: Citation[];
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
